import axios from "axios";
import { FunctionComponent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SubBreedComponent from '../BreedPage/subBreeds'

interface BreedPageProps {
}
 
const BreedPage: FunctionComponent<BreedPageProps> = (props:BreedPageProps) => {
    let {breedName} = useParams();
    let [imgUrls, setImgUrls] = useState([])
    useEffect(() =>{
        axios
        .get('https://dog.ceo/api/breed/'+breedName+'/images')
        .then((imgs)=>{
            return setImgUrls(imgs.data.message)
        })
        .catch(err=>console.log(err));
    },[])
    return (
        <section>
            <h1 className="intro">{breedName}</h1>
            {imgUrls.map( (url,index)=>(
                <figure key={index} className="breed-img" id={breedName+'-'+index}> 
                    <img src={url} alt={"Image of "+breedName}/>
                </figure>
            ))}
            <h2 className="subCategories">Sub Breeds for {breedName}</h2>
                <SubBreedComponent main={breedName as string} />
            
        </section>)
}
 
export default BreedPage;