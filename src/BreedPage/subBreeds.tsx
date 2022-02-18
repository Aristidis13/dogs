import axios from "axios";
import { FunctionComponent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SubBreedCompImage from "./SubBreedComp";

interface SubBreedListComponentProps {
    main:string
}
 
const SubBreedListComponent: FunctionComponent<SubBreedListComponentProps> = (props:SubBreedListComponentProps) => {
    let [subBreeds,setSubBreeds] = useState([])
    useEffect( () => {
        axios
        .get('https://dog.ceo/api/breed/'+props.main+'/list')
        .then(res=>{
            setSubBreeds(res.data.message);
        })
        .catch(err => {console.log(err);})
    },[])
    return (<>
        <p>This is all the subBreeds of {props.main}</p>
        {
            subBreeds.map( (subBreed:string,index) => (
                <figure key={index} className={"subBreed-"+index}>
                    <Link to={`${subBreed}`}>
                        <figcaption className="caption">{subBreed}</figcaption>
                        <SubBreedCompImage key={"subBreed-"+index} name={subBreed}  mainCategory={props.main} />
                    </Link>
                </figure>
                
            ))
        }
    </>
    );
}
 
export default SubBreedListComponent;