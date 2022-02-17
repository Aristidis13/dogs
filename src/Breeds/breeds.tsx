import axios from 'axios';
import { FunctionComponent, useEffect, useState } from 'react';

interface BreedsPageProps {

}

type TBreedType = {
    name: string,
    subBreeds:string[]
}

const BreedsPage: FunctionComponent<BreedsPageProps | undefined> = () => {
    const [breedsContainer,setBreeds] = useState([]);
    useEffect( () => {
        let breeds:TBreedType[] = [];
        axios
        .get('breeds/list/all')
        .then( list => {
            Object.entries(list.data.message).forEach( someBreed => {
                let thisbreed = { "name": someBreed[0], "subBreeds": someBreed[1] as string[] }
                breeds.push(thisbreed);
            })
            setBreeds(breeds as never[])
        }).catch(error => console.log("Error in fetching main breeds: " + error));
    },[]);
    return <section>
        <h2>This is the Breeds Page</h2>
        {
             breedsContainer.map( breed => <MainBreed
                    key={breed['name']}
                    name={breed['name']}
                    subBreeds={ breed['subBreeds']}
                />
               )
        }
    </section>
}


interface MainBreedProps {
    name:string;
    //imageUrl:string; <Link className="rater" > </Link>
    subBreeds: string[];
}

const MainBreed: FunctionComponent<MainBreedProps> = (props:MainBreedProps) => {
    const [imgUrl,setBreedImg] = useState("");
    useEffect( () => {
        axios
        .get('breed/'+props.name+'/images/random')
        .then( res => {setBreedImg(res.data.message); })
        .catch(err => {console.error('Error in image fetching: '+err);})
    },[imgUrl,props.name])
    return  <figure key={props.name}>
        <figcaption className="breed-header">{props.name}</figcaption>
            <img className="breed-image" src={imgUrl} alt={"Image of "+props.name} />
    </figure>
}

export default BreedsPage;