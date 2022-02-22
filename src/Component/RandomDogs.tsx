import {FunctionComponent, useCallback, useEffect,useState} from 'react'
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
    return ( <article className="randomDogsPage">
        <h1 className="pageTitle">Dog Lovers</h1>
        <p className="text randomIntro">See as many <span className="emoji">&#128054;</span> as you want!</p>
        <section id="randomDogsImgs">
            {helpers.showDogs(dogs,"random")}
        </section>
        <button className="loadBtn" onClick={() => fetchDogs()}>Fetch more dogs</button>
    </article> );
    else return <div>Request Failed with error:<br/>{dogs[1]} </div>
}

export default RandomDogs;