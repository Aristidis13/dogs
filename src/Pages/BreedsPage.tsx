import axios from 'axios';
import { FunctionComponent, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Breed from '../Component/Breed';
import * as helpers from '../Helpers';
import ReactPaginate from 'react-paginate';


interface BreedsPageProps {

}

const BreedsPage: FunctionComponent<BreedsPageProps> = () => {
    const [breedsContainer,setBreeds] = useState<Array<string[]>>([]);
    const [breedsInScreen, setNewBreedsInScreen] = useState<string[]>([]);
    function pageChange({selected}:any) {
        setNewBreedsInScreen(breedsContainer[selected]);
    }
    const fetchBreeds = () => {
        return breedsInScreen.map( breed => ( 
            <div key={breed} className="breedContainer" >
                <Link to={breed} >
                   <Breed name={breed} />
               </Link>
           </div>
        ))
    };
    useEffect( () => {
        axios
        .get('breeds/list/all')
        .then( list => {
            let breeds:Array<string[]> = helpers.splitArrayToNameArrays(Object.keys(list.data.message));
            setBreeds(breeds);
            setNewBreedsInScreen(breeds[0])
        }).catch(error => console.log("Error in fetching main breeds: " + error));
    },[]);
    return <article id="breedsPage">
        <h2 className="pageTitle">Dog breeds</h2>
        <p className="breedsIntro"> Today, many of the dogs you know and love are the product of selective breeding between 
            individuals with desirable traits, either physical or behavioral. For instance, around 9,500 
            years ago, ancient peoples began breeding dogs that were best able to survive and work in the cold. 
            These dogs would become the family of sled dogs—including breeds such as huskies and malamutes—that 
            remains relatively unchanged today.

            Similarly, humans bred German shepherds for their ability to herd livestock, Labrador retrievers to 
            help collect ducks and other game felled by hunters, and sausage-shaped Dachshunds for their ability 
            to rush down a burrow after a badger. Many more breeds were created to fill other human needs, such 
            as home protection and vermin control.  

            Certain breeds have also been created to make dogs more desirable as companions. For instance, the 
            labradoodle, which combines the traits of a Labrador retriever and a poodle, was invented as an attempt 
            to create a hypoallergenic guide dog.</p>
        <p className="pagination-cta">Search a breed you want to find by letter</p>
        <ReactPaginate
            pageCount={breedsContainer.length}
            pageRangeDisplayed={breedsContainer.length}
            pageLabelBuilder={(n:number) =>helpers.findLetter(breedsContainer,n) }
            nextLabel={"›"}
            previousLabel={"‹"}
            onPageChange={pageChange}
            /*CSS classanames*/
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
