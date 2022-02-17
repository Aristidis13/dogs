import axios from 'axios';
import { FunctionComponent, useEffect, useState } from 'react';

interface BreedsPageProps {

}

type TBreedType = {
    name: string,
    img: string | void,
    subBreeds:string[]
}

const getUrl = async ( breeds:TBreedType[]) => {
    for (let i=0; i<breeds.length; i++) {
        await axios
        .get('breed/'+breeds[i].name+'/images/random')
        .then( res => {breeds[i].img = res.data.message; })
        .catch(err => {console.error('Error in image fetching: '+err);})
    }
    return breeds;
}

const BreedsPage: FunctionComponent<BreedsPageProps | undefined> = () => {
    const [breedsContainer,setBreeds] = useState([]);
    let breeds:TBreedType[] = [];
    useEffect( () => {
        let time1 = performance.now()
        axios
        .get('breeds/list/all')
        .then( async list => {
            Object.entries(list.data.message).forEach( someBreed => {
                let thisbreed = { "name": someBreed[0], "img" : "", "subBreeds": someBreed[1] as string[] }
                breeds.push(thisbreed);
            })
        let time2 = performance.now();
            console.group("Time passed ");
            console.log(time2-time1);
            console.groupEnd();
            await getUrl(breeds).then((breeds) =>{setBreeds(breeds as never[]);}).catch(error=>console.log(error));
            let time3 = performance.now();
            console.group("Time passed ");
            console.log(time3-time2);
            console.groupEnd();
        }).catch(error => console.log("Error in fetching main breeds: " + error));

    },[]);
    return <section>
        <h2>This is the Breeds Page</h2>
        {
             breedsContainer.map( breed => <MainBreed
                    key={breed['name']}
                    name={breed['name']}
                    imageUrl={breed['img']}
                    subBreeds={ breed['subBreeds']}
                />
               )
        }
    </section>
}


interface MainBreedProps {
    name:string;
    imageUrl:string; 
    subBreeds: string[];
}

const MainBreed: FunctionComponent<MainBreedProps> = (props:MainBreedProps) => {
    return  <figure key={props.name}>
        <figcaption className="breed-header">{props.name}</figcaption>
        <img className="breed-image" src={props.imageUrl} alt={"Image of "+props.name} />
    </figure>
}

export default BreedsPage;