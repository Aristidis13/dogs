import {FunctionComponent} from 'react'
import Dogs from './../axios/axios-request'

interface HomePageProps {
    
}

const HomePage: FunctionComponent<HomePageProps> = () => {
    return ( <article className="dogs-list">
            Home Page
            <Dogs />
        </article> );
    }
 
export default HomePage;