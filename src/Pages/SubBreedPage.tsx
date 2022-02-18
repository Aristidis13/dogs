import axios from "axios";
import { FunctionComponent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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
    })
    return ( <section>
        <p>This is the name of the subreed {subBreed} of {breedName}</p>
        {
            subBreedImgs.map( (img,index) => <figure key={index} className="subBreed-img" id={breedName+'-'+index}> 
                <img src={img} alt={"Image of "+breedName}/>
            </figure>
            )
        }
    </section> );
}
 
export default SubBreedPage;