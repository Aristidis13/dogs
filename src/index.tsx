import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {BrowserRouter,Routes,Route, HashRouter } from 'react-router-dom'
import Header from './Pages/Header'
import HomePage from './Pages/HomePage'
import BreedsPage from './Pages/BreedsPage';
import BreedPage from './Pages/BreedPage'
import SubBreedPage from './Pages/SubBreedPage';
import NotFoundPage from './Pages/NotFound';


ReactDOM.render(
  <React.StrictMode>
    <HashRouter >
      <Header />
      <Routes>
        <Route path="/" element={<HomePage numOfDogsPerAPIRequest={9} /> } />
        <Route path="breeds" element={<BreedsPage />}/>
        <Route path="breeds/:breedName" element={<BreedPage />} />
        <Route path="breeds/:breedName/:subBreed" element={
          true 
          ? <SubBreedPage />
          : <NotFoundPage />}
        />        
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </HashRouter>
  </React.StrictMode>,
  document.getElementById('root')
);