import axios from 'axios';
import { FunctionComponent, useEffect, useState } from 'react';

interface BreedsPageProps {

}

type TBreedType = {
    name: string,
    img: string,
    subBreeds:string[]
}

const BreedsPage: FunctionComponent<BreedsPageProps> = () => {
    const [breedsContainer,setBreeds] = useState([]);
    useEffect( () => {
        let breeds:TBreedType[] = [];
        axios
        .get('breeds/list/all')
        .then( someBreed => {
            Object.entries(someBreed.data.message).forEach( breed => {
            let breedObj:TBreedType = {
                "name": breed[0],
                "img" : "",
                "subBreeds": breed[1] as string[]
                }
                axios
                .get('breed/'+breed[0]+'/images/random')
                .then( async res => {  breedObj.img= await res.data.message; })
                .catch(err => {console.error('Error in image fetching: '+err);})
                breeds.push(breedObj);
                console.log(breedObj);
                console.log(breeds)
                
            })}).then(() => {
                setBreeds(breeds as never[]);
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