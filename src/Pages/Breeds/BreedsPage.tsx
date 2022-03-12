import { FunctionComponent, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Breed from './BreedInBreeds';
import {splitArrayToNameArrays,findLetter, FetchData} from '../../Helpers';
import ReactPaginate from 'react-paginate';
import Title from '../../Common/Title';
import Text from '../../Common/Text';

/**
 * Interface for BreedsPage Component
 */
 export interface BreedsPageProps {
    urlForAPICall:string
}

const BreedsPage: FunctionComponent<BreedsPageProps> = (props:BreedsPageProps) => {
    const [breedsContainer,setBreeds] = useState<Array<string[]>>([]);
    const [breedsInScreen, setNewBreedsInScreen] = useState<string[]>([]);
    const pageChange = ({selected}:any) => setNewBreedsInScreen(breedsContainer[selected]);
    const fetchBreeds = () => {
        return breedsInScreen.map( breed => ( 
                <Link key={breed} to={breed} className="breedContainer" >
                   <Breed name={breed} />
               </Link>
        ))
    };
    useEffect( () => {
        FetchData(props.urlForAPICall).then((data:string[])=>{
            let breeds:Array<string[]> = splitArrayToNameArrays(Object.keys(data));
            setBreeds(breeds);
            setNewBreedsInScreen(breeds[0]);
        });
    },[props.urlForAPICall]);
    return <article id="breedsPage">
        <Title name={'Dog Breeds'} />
        <Text textClass={"breedsIntro"} text={<>Today, many of the dogs you know and love are the product of selective breeding between individuals with desirable traits, either physical or behavioral. For instance, around 9,500 years ago, ancient peoples began breeding dogs that were best able to survive and work in the cold. These dogs would become the family of sled dogs—including breeds such as huskies and malamutes—that remains relatively unchanged today. Similarly, humans bred German shepherds for their ability to herd livestock, Labrador retrievers to help collect ducks and other game felled by hunters, and sausage-shaped Dachshunds for their ability to rush down a burrow after a badger. Many more breeds were created to fill other human needs, such as home protection and vermin control. Certain breeds have also been created to make dogs more desirable as companions. For instance, the labradoodle, which combines the traits of a Labrador retriever and a poodle, was invented as an attempt to create a hypoallergenic guide dog.</>}  />
        <Text textClass="pagination-cta" text={<>Search a breed you want to find by letter</>} />
        <ReactPaginate
            pageCount={breedsContainer.length}
            pageRangeDisplayed={breedsContainer.length}
            pageLabelBuilder={(n:number) =>findLetter(breedsContainer,n) }
            nextLabel={"›"}
            previousLabel={"‹"}
            onPageChange={pageChange}
            /*CSS classnames*/
            containerClassName="breedsPaginationContainer" 
            pageClassName="paginationLetter"
            pageLinkClassName="paginationLink"
            activeClassName="activeLetter"
            previousClassName="prevBtn"
            nextClassName="nextBtn"
            activeLinkClassName="activeLink"
            previousLinkClassName="prevLink"
            nextLinkClassName="nextLink"
        />
        <section id="breeds"> { fetchBreeds() } </section>
    </article>
}

export default BreedsPage;
