/* eslint-disable react-hooks/exhaustive-deps */
import { FunctionComponent, useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { showDogs, FetchData } from "../../Helpers";
import { Typography } from "antd";

interface ISubBrred {
  breedName: string;
  subBreedName: string;
  returnToParentBreed: Function;
}

const SubBreedPage: FunctionComponent<ISubBrred> = ({
  breedName,
  subBreedName,
  returnToParentBreed
}) => {
  const POSTSPERPAGE = 12;
  let [subBreedImgsContainer, setSubBreedImgsContainer] = useState<string[]>(
    []
  );
  let [numOfPages, setNumOfPages] = useState<number>(0);
  let [imgsInScreen, setImgsInScreen] = useState<string[]>([]);
  let [compIsMounted, setCompIsMounted] = useState<boolean>(false);
  const urlForAPICall = "breed/" + breedName + "/" + subBreedName + "/images";

  const breedPageChange = ({ selected }: any) => {
    setImgsInScreen(
      subBreedImgsContainer.slice(
        selected * POSTSPERPAGE,
        selected * POSTSPERPAGE + POSTSPERPAGE
      )
    );
  };

  useEffect(() => {
    if (!compIsMounted) {
      setCompIsMounted(true);
      FetchData(urlForAPICall)
        .then(data => setSubBreedImgsContainer(data))
        .catch(err => setSubBreedImgsContainer(["ERROR", err]));
    }
    setNumOfPages(Math.ceil(subBreedImgsContainer.length / POSTSPERPAGE));
    setImgsInScreen(subBreedImgsContainer.slice(0, POSTSPERPAGE));
  }, [compIsMounted, subBreedImgsContainer, breedName]);
  return (
    <section id="subBreedPage">
      <div className="header-container">
        <h2 className="subBreedHeader">
          <span className="subBreedSpan">{subBreedName}</span>, a sub-breed of{" "}
          <span className="mainBreedSpan">{breedName}</span>
        </h2>
        <Typography
          className="return isLink"
          onClick={() => returnToParentBreed([breedName])}
        >
          Return to Parent Breed
        </Typography>
      </div>
      <section id="subBreed">{showDogs(imgsInScreen, "subBreed")}</section>
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
    </section>
  );
};

export default SubBreedPage;
