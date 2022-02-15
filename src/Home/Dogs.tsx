import axios from 'axios';
import {FunctionComponent, useEffect,useState} from 'react'
import Dog from './Dog'

interface IDogsProps {
}

const RandomDogs: FunctionComponent<IDogsProps> = () => {
    const [dogs,setDogs] = useState([]);
    useEffect( () => { 
        axios
        .get('breeds/image/random/50')
        .then(response => setDogs(response.data.message))
        .catch(err =>console.log(err))
    },[]);      
    return ( <section>
        <h1>Random Dogs</h1>
        <ul>
            {dogs.map( (dog,index) => 
                <Dog key={index.toString()}
                     index={index.toString()}
                     imgUrl={dog} /> )}
        </ul>
    </section> );
}



export default RandomDogs;