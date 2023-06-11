import { FunctionComponent, useEffect, useState } from "react";
import Breed from "./BreedInBreeds";
import { splitArrayToNameArrays, findLetter, FetchData } from "../../Helpers";
import ReactPaginate from "react-paginate";

export interface BreedsPageProps {
  urlForAPICall: string;
  handleBreedSelection: Function;
}

const BreedsPage: FunctionComponent<BreedsPageProps> = ({
  urlForAPICall,
  handleBreedSelection
}) => {
  const [breedsContainer, setBreeds] = useState<Array<string[]>>([]);
  const [breedsInScreen, setBreedsInScreen] = useState<string[]>([]);
  const pageChange = ({ selected }: any) =>
    setBreedsInScreen(breedsContainer[selected]);

  useEffect(() => {
    FetchData(urlForAPICall).then((data: string[]) => {
      let breeds: Array<string[]> = splitArrayToNameArrays(Object.keys(data));
      setBreeds(breeds);
      setBreedsInScreen(breeds[0]);
    });
  }, [urlForAPICall]);
  return (
    <article id="breedsPage">
      <ReactPaginate
        pageCount={breedsContainer.length}
        pageRangeDisplayed={breedsContainer.length}
        pageLabelBuilder={(n: number) => findLetter(breedsContainer, n)}
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
      <section id="breeds">
        {breedsInScreen.map(breed => (
          <div
            key={breed}
            className="breedContainer"
            onClick={() => handleBreedSelection([breed])}
          >
            <Breed name={breed} />
          </div>
        ))}
      </section>
    </article>
  );
};

export default BreedsPage;
