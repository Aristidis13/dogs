import { FunctionComponent, useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useParams } from "react-router-dom";
import SubBreedsList from "./subBreedList";
import { showDogs, FetchData } from "../../Helpers";

export interface IBreed {
  breedName?: string;
}

const BreedPage: FunctionComponent<IBreed> = ({ breedName }) => {
  const POSTSPERPAGE = 10;
  let { breedNameP } = useParams();
  const urlForAPICall = "https://dog.ceo/api/breed/" + breedNameP + "/images";
  let [imgUrlsContainer, setImgUrlsContainer] = useState<string[]>([]);
  let [numOfPages, setNumOfPages] = useState<number>(0);
  let [imgsInScreen, setImgsInScreen] = useState<string[]>([]);
  const pageChange = ({ selected }: any) => {
    setImgsInScreen(
      imgUrlsContainer.slice(
        selected * POSTSPERPAGE,
        selected * POSTSPERPAGE + POSTSPERPAGE
      )
    );
  };
  useEffect(() => {
    FetchData(urlForAPICall).then((imgUrls: string[]) => {
      setImgUrlsContainer(imgUrls);
      setNumOfPages(Math.ceil(imgUrls.length / POSTSPERPAGE));
      setImgsInScreen(imgUrls.slice(0, POSTSPERPAGE));
    });
  }, [urlForAPICall]);
  return (
    <section id="breedPage">
      <h1 className="intro"> {breedNameP || "Unknown Breed"} </h1>
      <ReactPaginate
        pageCount={numOfPages}
        pageRangeDisplayed={4}
        marginPagesDisplayed={4}
        previousLabel={"Previous"}
        nextLabel={"Next"}
        renderOnZeroPageCount={() => null}
        onPageChange={pageChange}
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
      <section id="breed"> {showDogs(imgsInScreen, "breed")}</section>
      <section id="subBreedsList">
        <SubBreedsList main={breedNameP || ""} />
      </section>
    </section>
  );
};

export default BreedPage;
