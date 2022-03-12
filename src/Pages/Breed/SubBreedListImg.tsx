import { FunctionComponent, useEffect, useState } from "react";
import { retrieveString } from "../../Helpers";

interface SubBreedListImgProps {
    breedName?:string
    subBreed?: string
    name:string
}

const LoadImg: FunctionComponent<SubBreedListImgProps> = (props: SubBreedListImgProps) => {
    let [imgUrl,setImgUrl] = useState<string>("");
    useEffect(() => {
        retrieveString('https://dog.ceo/api/breed/'+props.breedName+'/'+props.name+'/images/random',setImgUrl);
    },[props.breedName,props.name])
    return (<><img src={imgUrl} alt={"Sub breed of "+props.breedName} /></>);
}
 
export default LoadImg;