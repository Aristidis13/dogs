import axios from "axios";
import { FunctionComponent, useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useParams } from "react-router-dom";
import Dog from "../Component/Dog";
//import * as helpers from "../Helpers";


interface SubBreedPageProps {
    
}
 
const SubBreedPage: FunctionComponent<SubBreedPageProps> = () => {
    const POSTSPERPAGE = 10;
    let {subBreed,breedName} = useParams<string>();
    let [subBreedImgsContainer, setSubBreedImgsContainer] = useState<string[]>([]);
    let [numOfPages,setNumOfPages] = useState<number>(0)
    let [imgsInScreen,setImgsInScreen] = useState<string[]>([]);
    const [compIsMounted,setCompIsMounted] = useState<boolean>(false); // Mounts once the fetchDogs function
    const breedPageChange = ({selected}:any) => {
        setImgsInScreen(subBreedImgsContainer.slice(selected*POSTSPERPAGE, selected*POSTSPERPAGE+POSTSPERPAGE))
    }
    useEffect( () => {
        axios
        .get('https://dog.ceo/api/breed/'+breedName+'/'+subBreed+'/images')
        .then((imgs) => {
            setSubBreedImgsContainer(imgs.data.message);
            setNumOfPages(Math.ceil( imgs.data.message.length / POSTSPERPAGE ));
            if (!compIsMounted){
                setCompIsMounted(true);
                setImgsInScreen(imgs.data.message.slice(0, POSTSPERPAGE))
            }

        })
        .catch((err) =>{console.error("Error for fetching images for subBreed "+err);})
    },[compIsMounted,breedName,subBreed])
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
        <section id="subBreed">
        {
            imgsInScreen.map( (imgUrl,index) => (
            <Dog key={index.toString()}
                 index={index.toString()}
                 imgUrl={imgUrl}
                 alt={"Image of "+subBreed+", a sub-breed of "+breedName}
                 prefix={"subBreed"}
            />))
        }
        </section>
    </section> );
}
 
export default SubBreedPage;