import {FunctionComponent, useCallback, useEffect,useState} from 'react'
import Dog from './Dog'
import * as helpers from '../Helpers'

interface IDogsProps {
    urlForAPICall: string
}

const RandomDogs: FunctionComponent<IDogsProps> = (props: IDogsProps) => {
    const [dogs,setDogs] = useState<string[]>([]);
    const [compIsMounted,setCompIsMounted] = useState<boolean>(false); // Mounts once the fetchDogs function
    const fetchDogs = useCallback(()=> helpers.retrieveData(props.urlForAPICall,dogs,setDogs),[props.urlForAPICall,dogs])
    useEffect( () => {
        if (!compIsMounted) {
            setCompIsMounted(true);
            fetchDogs();
        }
    },[ fetchDogs,compIsMounted ])
    if (dogs[0] !== 'ERROR')
    return ( <section>
        <h1>Welcome to Dog </h1>
        <section id="randomDogs">
            {dogs.map( (dog,index) => <Dog key={index.toString()}
                     index={index.toString()}
                     imgUrl={dog}
                     prefix={"random"}
                     /> )}
        </section>
        <button className="loadBtn" onClick={() => fetchDogs()}>Fetch more faces!</button>
    </section> );
    else return <div>Request Failed with error:<br/>{dogs[1]} </div>
}


export default RandomDogs;