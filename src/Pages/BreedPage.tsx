import axios from "axios";
import { FunctionComponent, useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useParams } from "react-router-dom";
import Dog from "../Component/Dog";
import SubBreeds from '../Component/subBreedList'


interface BreedPageProps {
}
 
const BreedPage: FunctionComponent<BreedPageProps> = (props:BreedPageProps) => {
    const POSTSPERPAGE = 10;
    let {breedName} = useParams<string>();
    let [imgUrlsContainer, setImgUrlsContainer] = useState<string[]>([]);
    let [numOfPages,setNumOfPages] = useState<number>(0)
    let [imgsInScreen,setImgs] = useState<string[]>([]);
    const [compIsMounted,setCompIsMounted] = useState<boolean>(false); // Mounts once the fetchDogs function
    const breedPageChange = ({selected}:any) => {
        setImgs(imgUrlsContainer.slice(selected*POSTSPERPAGE, selected*POSTSPERPAGE+POSTSPERPAGE))
    }
    useEffect(() =>{
        axios
        .get('https://dog.ceo/api/breed/'+breedName+'/images')
        .then((imgs)=>{
            setImgUrlsContainer(imgs.data.message);
            setNumOfPages(Math.ceil( imgs.data.message.length / POSTSPERPAGE ));
            if (!compIsMounted){
                setCompIsMounted(true);
                setImgs(imgs.data.message.slice(0, POSTSPERPAGE))
            }
        })
        .catch(err=>console.log(err));

    },[breedName,imgsInScreen,compIsMounted])
    return (
        <section id="breedPage">
            <h1 className="intro">{breedName}</h1>
            <ReactPaginate 
                pageCount={numOfPages}
                pageRangeDisplayed={4}
                marginPagesDisplayed={4}
                previousLabel={"Previous"}
                nextLabel={"Next"}
                renderOnZeroPageCount={()=>null}
                onPageChange={breedPageChange}

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
            <section id="breed">
            {imgsInScreen.map( (url,index)=> (
                <Dog key={index.toString()}
                     index={index.toString()}
                     imgUrl={url}
                     alt={"Image of "+breedName}
                     prefix={"breed"}
                />))}
            </section>
                <section id="subBreedsList">
                    <SubBreeds main={breedName || "" } />
                </section>
        </section>)
}
 
export default BreedPage;

