import {FunctionComponent} from 'react'
import RandomDogs from '../Component/RandomDogs'

interface HomePageProps {
    numOfDogsPerAPIRequest:number
}

const HomePage: FunctionComponent<HomePageProps> = (props: HomePageProps) => <article id="randomDogs">
            <RandomDogs urlForAPICall={'breeds/image/random/'+props.numOfDogsPerAPIRequest.toString()} />
        </article>
 
export default HomePage;