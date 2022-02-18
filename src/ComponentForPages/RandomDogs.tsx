import axios from 'axios';
import {FunctionComponent, useEffect,useState} from 'react'
import Dog from './Dog'

interface IDogsProps {
    urlForAPICall: string
}


const FetchDogs = async (url: string) => {
    let data:never[] = [];
    await axios
    .get(url)
    .then(res => data = res.data.message)
    .catch(err =>data = ['ERROR',err] as never[])
    return data;
}


const RandomDogs: FunctionComponent<IDogsProps> = (props: IDogsProps) => {
    const [dogs,setDogs] = useState([]);
    const fetchDogs = async () => {
        return await FetchDogs(props.urlForAPICall)
                     .then((data) => setDogs(dogs.concat(data)))
                     .catch(err => setDogs(['ERROR',err] as never[]))};
    useEffect( () => {
        fetchDogs();
    },[])
    if (dogs[0] !== 'ERROR')
    return ( <section>
        <h1>Welcome to Dog </h1>
        <section id="randomDogs">
            {dogs.map( (dog,index) => <Dog key={index.toString()}
                     index={index.toString()}
                     imgUrl={dog} /> )}
        </section>
        <button onClick={() => fetchDogs()}>Fetch more faces!</button>
    </section> );
    else return <div>Request Failed with error{dogs[1]} </div>
}

export default RandomDogs;