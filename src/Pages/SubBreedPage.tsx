import axios from "axios";
import { FunctionComponent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Dog from "../Component/Dog";

interface SubBreedPageProps {
    
}
 
const SubBreedPage: FunctionComponent<SubBreedPageProps> = () => {
    let {subBreed,breedName} = useParams();
    let [subBreedImgs,setSubBreedImgs] = useState([]);
    useEffect( () => {
        axios
        .get(' https://dog.ceo/api/breed/'+breedName+'/'+subBreed+'/images')
        .then((imgs) => {
            setSubBreedImgs(imgs.data.message);
        })
        .catch((err) =>{console.error("Error for fetching images for subBreed "+err);})
    },[breedName,subBreed])
    return ( <section>
        <p>This is the name of the subreed {subBreed} of {breedName}</p>
        {
            subBreedImgs.map( (imgUrl,index) => (
            <Dog key={index.toString()}
                 index={index.toString()}
                 imgUrl={imgUrl}
                 alt={"Image of "+subBreed+", a sub-breed of "+breedName}
                 prefix={"subBreed"}
            />))
        }
    </section> );
}
 
export default SubBreedPage;