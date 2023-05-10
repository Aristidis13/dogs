import React from "react";
import { render } from "react-dom";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Pages/Header/Header";
import BreedsPage from "./Pages/Breeds/BreedsPage";
import BreedPage from "./Pages/Breed/BreedPage";
import SubBreedPage from "./Pages/SubBreed/SubBreedPage";
import NotFoundPage from "./Pages/NotFoundPage";
import HomePage from "./Pages/Home/Home";

render(
  <React.StrictMode>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route
          path="/"
          element={<HomePage urlForAPICall={"breeds/image/random/9"} />}
        />
        <Route
          path="breeds"
          element={<BreedsPage urlForAPICall={"breeds/list/all"} />}
        />
        <Route path="breeds/:breedName" element={<BreedPage breedName="" />} />
        <Route path="breeds/:breedName/:subBreed" element={<SubBreedPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
