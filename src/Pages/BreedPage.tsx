import axios from "axios";
import { FunctionComponent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Dog from "../Component/Dog";
import SubBreedComponent from '../Component/subBreeds'

interface BreedPageProps {
}
 
const BreedPage: FunctionComponent<BreedPageProps> = (props:BreedPageProps) => {
    let {breedName} = useParams<string>();
    let [imgUrls, setImgUrls] = useState([])
    useEffect(() =>{
        axios
        .get('https://dog.ceo/api/breed/'+breedName+'/images')
        .then((imgs)=>{
            return setImgUrls(imgs.data.message)
        })
        .catch(err=>console.log(err));
    },[breedName])
    return (
        <section>
            <h1 className="intro">{breedName}</h1>
            {imgUrls.map( (url,index)=> (
                <Dog key={index.toString()}
                     index={index.toString()}
                     imgUrl={url}
                     alt={"Image of "+breedName}
                     prefix={"breed"}
                />))}
            <h2 className="subCategories">Sub Breeds for {breedName}</h2>
                <SubBreedComponent main={breedName || "" } />
        </section>)
}
 
export default BreedPage;