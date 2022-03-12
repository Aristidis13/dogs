import { FunctionComponent, useCallback, useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useParams } from "react-router-dom";
import { showDogs,retrieveData } from "../../Helpers";
 
export interface NoProps {}

const SubBreedPage: FunctionComponent<NoProps> = () => {
    const POSTSPERPAGE = 10;
    let {subBreed,breedName} = useParams<string>();
    let [subBreedImgsContainer, setSubBreedImgsContainer] = useState<string[]>([]);
    let [numOfPages,setNumOfPages] = useState<number>(0)
    let [imgsInScreen,setImgsInScreen] = useState<string[]>([]);
    let [compIsMounted,setCompIsMounted] = useState<boolean>(false)
    const urlForAPICall = 'https://dog.ceo/api/breed/'+breedName+'/'+subBreed+'/images';
    const breedPageChange = ({selected}:any) => {
        setImgsInScreen(subBreedImgsContainer.slice(selected*POSTSPERPAGE, selected*POSTSPERPAGE+POSTSPERPAGE))
    }
    const fetchDogs = useCallback(() => retrieveData(urlForAPICall,subBreedImgsContainer,setSubBreedImgsContainer),[urlForAPICall,subBreedImgsContainer]);
    useEffect( () => {
        if(!compIsMounted){
            setCompIsMounted(true);
            fetchDogs();
        }
        setNumOfPages(Math.ceil( subBreedImgsContainer.length / POSTSPERPAGE ));
        setImgsInScreen(subBreedImgsContainer.slice(0, POSTSPERPAGE));
    },[ fetchDogs,compIsMounted,subBreedImgsContainer])
    return ( <section id="subBreedPage">
        <h2 className="subBreedHeader">
            <span className="subBreedSpan">{subBreed}</span>,
            a sub-breed of <span className="mainBreedSpan">{breedName}</span></h2>
        <ReactPaginate 
                pageCount={numOfPages}
                pageRangeDisplayed={4}
                marginPagesDisplayed={4}
                previousLabel={"Previous"}
                nextLabel={"Next"}
                renderOnZeroPageCount={()=>null}
                onPageChange={breedPageChange}
                containerClassName="subBreedsPaginationContainer"
                pageClassName="paginationLetter"
                pageLinkClassName="paginationLink"
                activeClassName="activeLetter"
                previousClassName="prevBtn"
                nextClassName="nextBtn"
                activeLinkClassName="activeLink"
                previousLinkClassName="prevLink"
                nextLinkClassName="nextLink"
            />
        <section id="subBreed">{showDogs(imgsInScreen,"subBreed")}</section>
    </section> );
}
 
export default SubBreedPage;