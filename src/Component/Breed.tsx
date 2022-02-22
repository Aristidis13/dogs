import axios from 'axios';
import { FunctionComponent, useEffect, useState } from 'react';
import Dog from './Dog';

interface BreedProps {
    name:string;
}

const Breed: FunctionComponent<BreedProps> = (props:BreedProps) => {
    const [imgUrl,setBreedImg] = useState("");
    useEffect( () => {
        axios
        .get('breed/'+props.name+'/images/random')
        .then( res => {setBreedImg(res.data.message); })
        .catch(err => {console.error('Error in image fetching: '+err);})
    },[props.name])
    return  (
        <Dog key={props.name}
            index={props.name}
            imgUrl={imgUrl}
            prefix={'breed'}
            caption={props.name}
            alt={"Image of "+props.name}
        />
    )}
 
export default Breed;