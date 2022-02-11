import axios from 'axios';
import {FunctionComponent, useEffect,useState} from 'react'

interface IDogsProps {
}

const Dogs: FunctionComponent<IDogsProps> = () => {
    const [dogs,setPosts] = useState([]);
    useEffect( () => { 
        axios.get('breeds/image/random/50')
    .then(response =>{
       const dogs:string[] = response.data.message;
       console.log(dogs)
       setPosts(response.data.message)
   }).catch(err =>console.log(err))
    },[]);      
    return ( <section>
        <h1>Random Dogs</h1>
        <ul>
            {dogs.map( (dog,index) =>  (
                <li className="dog-item" key={"dog-"+index}>
                    <img src={dog} alt="A cute dog" />
                </li>))
           }
        </ul>
    </section> );
}
 
export default Dogs;