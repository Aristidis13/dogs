import axios from 'axios';
import { FunctionComponent, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import MainBreed from '../Breeds/BreedCategory'

interface MainBreedsPageProps {

}

type TBreedType = {
    name: string,
}

const MainBreedsPage: FunctionComponent<MainBreedsPageProps> = () => {
    const [breedsContainer,setBreeds] = useState([]);
    useEffect( () => {
        let breeds:TBreedType[] = [];
        axios
        .get('breeds/list/all')
        .then( list => {
            Object.entries(list.data.message).forEach( someBreed => {
                let thisbreed = { "name": someBreed[0] }
                breeds.push(thisbreed);
            })
            setBreeds(breeds as never[])
        }).catch(error => console.log("Error in fetching main breeds: " + error));
    },[]);
    return <section>
        <h2>Every Breed</h2>
        {
             breedsContainer.map( breed => ( 
             <section className="breed" >
                 <Link to={`${breed['name']}`} >
                    <MainBreed
                        key={breed['name']}
                        name={breed['name']}
                    />
                </Link>
                </section>
               ))
        }
    </section>
}

export default MainBreedsPage;