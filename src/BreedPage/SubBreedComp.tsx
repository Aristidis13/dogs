import axios from "axios";
import { FunctionComponent, useEffect, useState } from "react";

interface SubBreedCompImageProps {
    mainCategory:string
    name:string
}
 
const SubBreedCompImage: FunctionComponent<SubBreedCompImageProps> = (props: SubBreedCompImageProps) => {
    let [imgUrl,setImgUrl] = useState("");
    useEffect(() => {
        let url = 'https://dog.ceo/api/breed/'+props.mainCategory+'/'+props.name+'/images/random';
        console.log(url);
        axios.get(url)
        .then(response => setImgUrl(response.data.message))
        .catch(err => console.error(err))
    },[])
    return ( <>
        <img src={imgUrl} alt={"Sub breed of "+props.mainCategory} />
    </> );
}
 
export default SubBreedCompImage;