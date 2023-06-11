import React, { useState } from "react";
import { pages } from "./constants";
import "./index.css";
import Header from "./Pages/Header/Header";
import BreedsPage from "./Pages/Breeds/BreedsPage";
import BreedPage from "./Pages/Breed/BreedPage";
import SubBreedPage from "./Pages/SubBreed/SubBreedPage";
import NotFoundPage from "./Pages/NotFoundPage";
import HomePage from "./Pages/Home/Home";

const App = () => {
  const [visiblePage, setVisiblePage] = useState(pages.home);
  const [dataForApiCall, setDataForApiCall] = useState<string[]>([]);

  const onBreedSelection = (breed: string[]) => {
    setVisiblePage(pages.breed);
    setDataForApiCall([...breed]);
  };

  const onSubBreedSelection = (breed: string[]) => {
    setVisiblePage(pages.subBreed);
    setDataForApiCall(breed);
  };

  return (
    <React.StrictMode>
      <Header
        setVisiblePage={setVisiblePage}
        handleBreedSelection={onBreedSelection}
      />
      {visiblePage === pages.home && (
        <HomePage urlForAPICall="breeds/image/random/9" />
      )}
      {visiblePage === pages.breeds && (
        <BreedsPage
          urlForAPICall="breeds/list/all"
          handleBreedSelection={onBreedSelection}
        />
      )}
      {visiblePage === pages.breed && (
        <BreedPage
          breedName={dataForApiCall}
          handleSubBreedSelection={onSubBreedSelection}
        />
      )}
      {visiblePage === pages.subBreed && (
        <SubBreedPage
          breedName={dataForApiCall[0]}
          subBreedName={dataForApiCall[1]}
        />
      )}
      {typeof Object.values(pages).find(p => p === visiblePage) ===
        "undefined" && <NotFoundPage />}
    </React.StrictMode>
  );
};

export default App;
