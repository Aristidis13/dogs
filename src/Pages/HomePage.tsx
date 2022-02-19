import {FunctionComponent} from 'react'
import RandomDogs from '../Component/RandomDogs'

interface HomePageProps {
    
}

const HomePage: FunctionComponent<HomePageProps> = () => <article id="randomDogs">
            <RandomDogs urlForAPICall='breeds/image/random/10' />
        </article>
 
export default HomePage;