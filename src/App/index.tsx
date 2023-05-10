import React, { FunctionComponent, useReducer, useState } from "react";
import Header from "../Pages/Header/Header";
import { apiUrls, pages, initState } from "../constants";
import { onRedirection } from "./utils";
import { Routes, Route } from "react-router-dom";
import BreedsPage from "../Pages/Breeds/BreedsPage";
import BreedPage from "../Pages/Breed/BreedPage";
import SubBreedPage from "../Pages/SubBreed/SubBreedPage";
import NotFoundPage from "../Pages/NotFoundPage";
import HomePage from "../Pages/Home/Home";

interface NoProps {}

const App: FunctionComponent<NoProps> = () => {
  const [path, setPath] = useReducer(onRedirection as any, initState as any);
  const [numOfDogs, setNumOfDogs] = useState();

  return (
    <>
      {typeof path.pageUrl === "string"
        ? path?.pageUrl === pages.home && (
            <HomePage urlForAPICall={apiUrls.randomDogs} />
          )
        : null}
      <Routes>
        <Route
          path="breeds"
          element={<BreedsPage urlForAPICall={"breeds/list/all"} />}
        />
        <Route path="breeds/:breedName" element={<BreedPage breedName="" />} />
        <Route path="breeds/:breedName/:subBreed" element={<SubBreedPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
};

export default App;
