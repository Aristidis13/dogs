import axios from 'axios';
import {FunctionComponent, useEffect} from 'react'

interface IDogsProps {
    
}

const Dogs: FunctionComponent<IDogsProps> = () => {
    useEffect( () => getDogs(),[] );

    const getDogs = () => {
        axios.get('breeds/image/random/50')
    .then(response =>{
       const dogs:string[] = response.data.message;
       const randomDogs = dogs.map( dog => (
           <li className="dog-item">
               <img src={dog} alt="A cute dog" />
           </li>
       ))
       console.log(randomDogs)
   }).catch(err =>console.log(err))}
    return ( <section>
        <h1>Random Dogs</h1>
        <ul>

        </ul>
    </section> );
}
 
export default Dogs;