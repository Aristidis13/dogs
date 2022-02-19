import axios from "axios";
import { FunctionComponent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LoadImg from './LoadImg'

interface SubBreedListComponentProps {
    main:string
}
 
const SubBreedListComponent: FunctionComponent<SubBreedListComponentProps> = (props:SubBreedListComponentProps) => {
    let [subBreeds,setSubBreeds] = useState<string[]>([])
    useEffect( () => {
        axios
        .get('https://dog.ceo/api/breed/'+props.main+'/list')
        .then(res=>{
            setSubBreeds(res.data.message);
        })
        .catch(err => {console.log(err);})
    },[props.main])
    return (<>
        <p>This is all the subBreeds of {props.main}</p>
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
    </>
    )
}
 
export default SubBreedListComponent;