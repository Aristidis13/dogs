import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {BrowserRouter,Routes,Route } from 'react-router-dom'
import Header from './Pages/Header'
import HomePage from './Pages/HomePage'
import MainBreedsPage from './Pages/MainBreedsPage';
import BreedPage from './Pages/BreedPage'
import SubBreedPage from './Pages/SubBreedPage';
import NotFoundPage from './Pages/NotFound';


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage /> } />
        <Route path="breeds" element={<MainBreedsPage />}/>
        <Route path="breeds/:breedName" element={<BreedPage />} />
        <Route path="breeds/:breedName/:subBreed" element={<SubBreedPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);