import { FunctionComponent, useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import SubBreedsList from "./subBreedList";
import { showDogs, FetchData } from "../../Helpers";

export interface IBreed {
  handleSubBreedSelection: Function;
  breedName: string[];
}

const BreedPage: FunctionComponent<IBreed> = ({
  breedName,
  handleSubBreedSelection
}) => {
  const POSTSPERPAGE = 12;
  const urlForAPICall = "breed/" + breedName[0] + "/images";
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
      <h1 className="intro"> {breedName || "Unknown Breed"} </h1>
      <section id="breed"> {showDogs(imgsInScreen, "breed")}</section>
      {numOfPages > 1 && (
        <ReactPaginate
          pageCount={numOfPages}
          pageRangeDisplayed={3}
          marginPagesDisplayed={3}
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
      )}
      <section id="subBreedsList">
        <SubBreedsList
          main={breedName?.[0]}
          handleSubBreedSelection={handleSubBreedSelection}
        />
      </section>
    </section>
  );
};

export default BreedPage;
