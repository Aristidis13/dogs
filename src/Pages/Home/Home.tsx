import {FunctionComponent, useCallback, useEffect,useState} from 'react'
import {showDogs,retrieveData} from '../../Helpers'
import Title from '../../Common/Title';
import Text from '../../Common/Text';

/**
 * Props for Dogs appearing in the start of the website
 */
interface IDogsProps {
    urlForAPICall: string
}

const HomePage: FunctionComponent<IDogsProps> = (props: IDogsProps) => {
    const [dogs,setDogs] = useState<string[]>([]);
    const [compIsMounted,setCompIsMounted] = useState<boolean>(false);
    const fetchDogs = useCallback(()=> retrieveData(props.urlForAPICall,dogs,setDogs),[props.urlForAPICall,dogs])
    useEffect( () => {
        if (!compIsMounted) {
            setCompIsMounted(true);
            fetchDogs();
        }
    },[ fetchDogs,compIsMounted ])
    return <article className="randomDogsPage"> <Title name="Dog Lovers" />
            <Text textClass="text randomIntro" text={<>See as many <span className="emoji">&#128054;</span> as you want!</>} />
            <section id="randomDogsImgs"> {showDogs(dogs,"random")}</section>
            <button className="loadBtn" onClick={() => fetchDogs()}>Fetch more dogs</button>
    </article>
}

export default HomePage;