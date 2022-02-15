import {FunctionComponent} from 'react'
import RandomDogs from './Dogs'

interface HomePageProps {
    
}

const HomePage: FunctionComponent<HomePageProps> = () => {
    return ( <article className="dogs-list">
            Home Page
            <RandomDogs />
        </article> );
    }
 
export default HomePage;