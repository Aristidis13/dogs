import axios from "axios";
import { FunctionComponent, useEffect, useState } from "react";

interface LoadImgProps {
    breedName?:string
    subBreed?: string
    name:string
}
 
const LoadImg: FunctionComponent<LoadImgProps> = (props: LoadImgProps) => {
    let [imgUrl,setImgUrl] = useState("");
    useEffect(() => {
        let url = 'https://dog.ceo/api/breed/'+props.breedName+'/'+props.name+'/images/random';
        axios.get(url)
        .then(response => setImgUrl(response.data.message))
        .catch(err => console.error(err))
    },[props.breedName,props.name])
    return ( <>
        <img src={imgUrl} alt={"Sub breed of "+props.breedName} />
    </> );
}
 
export default LoadImg;