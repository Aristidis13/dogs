import axios from 'axios';
import { FunctionComponent, useEffect, useState } from 'react';

interface MainBreedProps {
    name:string;
}

const MainBreed: FunctionComponent<MainBreedProps> = (props:MainBreedProps) => {
    const [imgUrl,setBreedImg] = useState("");
    useEffect( () => {
        axios
        .get('breed/'+props.name+'/images/random')
        .then( res => {setBreedImg(res.data.message); })
        .catch(err => {console.error('Error in image fetching: '+err);})
    },[props.name])
    return  (
            <figure key={props.name}>
                <figcaption className="breed-header">{props.name}</figcaption>
                <img className="breed-image" src={imgUrl} alt={"Image of "+props.name} />
            </figure>)
}
 
export default MainBreed;