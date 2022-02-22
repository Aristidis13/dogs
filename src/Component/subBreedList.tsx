import axios from "axios";
import { FunctionComponent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LoadImg from './LoadImg'

interface SubBreedListProps {
    main:string
}
 
const SubBreedList: FunctionComponent<SubBreedListProps> = (props:SubBreedListProps) => {
    let [subBreeds,setSubBreeds] = useState<string[]>([])
    useEffect( () => {
        axios
        .get('https://dog.ceo/api/breed/'+props.main+'/list')
        .then(res=>{
            setSubBreeds(res.data.message);
        })
        .catch(err => {console.log(err);})
    },[props.main])
    if(subBreeds.length > 0)
    return (<>
        <h2 className="subBreeds">Sub Breeds for {props.main}</h2>
        {
            subBreeds.map( (subBreed,index) => (
                <Link to={`${subBreed}`} key={index} >
                    { <figure className={"subBreed-"+index}>
                        <figcaption className="caption">{subBreed}</figcaption>
                        <LoadImg 
                            key={"subBreed-"+index}
                            name={subBreed}
                            breedName={props.main}
                        />
                    </figure> }
                </Link>
            ))
        }
    </>)
    else return (<></>)
}
 
export default SubBreedList;