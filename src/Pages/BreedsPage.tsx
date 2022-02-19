import axios from 'axios';
import { FunctionComponent, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import MainBreed from '../Component/MainBreed'

interface BreedsPageProps {

}

const BreedsPage: FunctionComponent<BreedsPageProps> = () => {
    const [breedsContainer,setBreeds] = useState<string[]>([]);
    useEffect( () => {
        let breeds:string[] = [];
        axios
        .get('breeds/list/all')
        .then( list => {
            Object.entries(list.data.message).forEach( someBreed => {
                breeds.push(someBreed[0]);
            })
            setBreeds(breeds as never[])
        }).catch(error => console.log("Error in fetching main breeds: " + error));
    },[]);
    return <section>
        <h2>Every Breed</h2>
        {
             breedsContainer.map( (breed,index) => ( 
             <section key={breed} className="breedContainer" >
                 <Link to={breed} >
                    <MainBreed name={breed} />
                </Link>
                </section>
               ))
        }
    </section>
}

export default BreedsPage;