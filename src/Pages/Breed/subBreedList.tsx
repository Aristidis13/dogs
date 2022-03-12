import { FunctionComponent, useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LoadImg from './SubBreedListImg';
import { retrieveData } from "../../Helpers";

interface SubBreedListProps {
    main:string
}

const SubBreedList: FunctionComponent<SubBreedListProps> = (props:SubBreedListProps) => {
    let [subBreeds,setSubBreeds] = useState<string[]>([]);
    let [compIsMounted,setCompIsMounted] = useState<boolean>(false);
    const fetchDogs = useCallback( ()=> retrieveData('https://dog.ceo/api/breed/'+props.main+'/list',subBreeds,setSubBreeds),[props.main,subBreeds]);
    useEffect( () => {
        if(!compIsMounted) {
            setCompIsMounted(true);
            fetchDogs();
        }
    },[compIsMounted,fetchDogs])
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