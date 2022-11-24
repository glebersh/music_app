import React from 'react';

import './App.css';

import SearchResultsPage from '../pages/SearchResultsPage/SearchResultsPage';
import { Routes, Route } from 'react-router-dom';
import ArtistPage from '../pages/ArtistPage/ArtistPage';

const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' index element={<SearchResultsPage />} />
        <Route path="artists/:artistID" element={<ArtistPage />} />
      </Routes>
    </>

  )
};

export default App;