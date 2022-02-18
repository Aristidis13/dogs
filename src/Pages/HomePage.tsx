import {FunctionComponent} from 'react'
import RandomDogs from '../ComponentForPages/RandomDogs'

interface HomePageProps {
    
}

const HomePage: FunctionComponent<HomePageProps> = () => {
    return ( <article className="dogs-list">
            <RandomDogs urlForAPICall='breeds/image/random/10' />
        </article> );
    }
 
export default HomePage;