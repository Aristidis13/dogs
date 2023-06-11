import { FunctionComponent, useCallback, useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { showDogs, retrieveData } from "../../Helpers";

interface ISubBrred {
  breedName: string;
  subBreedName: string;
}

const SubBreedPage: FunctionComponent<ISubBrred> = ({
  breedName,
  subBreedName
}) => {
  const POSTSPERPAGE = 10;
  let [subBreedImgsContainer, setSubBreedImgsContainer] = useState<string[]>(
    []
  );
  let [numOfPages, setNumOfPages] = useState<number>(0);
  let [imgsInScreen, setImgsInScreen] = useState<string[]>([]);
  let [compIsMounted, setCompIsMounted] = useState<boolean>(false);
  const urlForAPICall =
    "https://dog.ceo/api/breed/" + breedName + "/" + subBreedName + "/images";
  console.log("urlForAPICall", urlForAPICall);
  console.log("breedName", breedName);
  console.log("subBreedName ", subBreedName);
  const breedPageChange = ({ selected }: any) => {
    setImgsInScreen(
      subBreedImgsContainer.slice(
        selected * POSTSPERPAGE,
        selected * POSTSPERPAGE + POSTSPERPAGE
      )
    );
  };
  const fetchDogs = useCallback(
    () =>
      retrieveData(
        urlForAPICall,
        subBreedImgsContainer,
        setSubBreedImgsContainer
      ),
    [urlForAPICall, subBreedImgsContainer]
  );
  useEffect(() => {
    if (!compIsMounted) {
      setCompIsMounted(true);
      fetchDogs();
    }
    setNumOfPages(Math.ceil(subBreedImgsContainer.length / POSTSPERPAGE));
    setImgsInScreen(subBreedImgsContainer.slice(0, POSTSPERPAGE));
  }, [fetchDogs, compIsMounted, subBreedImgsContainer]);
  return (
    <section id="subBreedPage">
      <h2 className="subBreedHeader">
        <span className="subBreedSpan">{subBreedName}</span>, a sub-breed of{" "}
        <span className="mainBreedSpan">{breedName}</span>
      </h2>
      <ReactPaginate
        pageCount={numOfPages}
        pageRangeDisplayed={4}
        marginPagesDisplayed={4}
        previousLabel={"Previous"}
        nextLabel={"Next"}
        renderOnZeroPageCount={() => null}
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
      <section id="subBreed">{showDogs(imgsInScreen, "subBreed")}</section>
    </section>
  );
};

export default SubBreedPage;
