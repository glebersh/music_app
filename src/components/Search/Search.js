import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import './Search.css';

import { getDataFromSearch, onCategoryChange } from '../../store/slices/searchSlice';

const Search = () => {
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState();
  const [searchCategory, setSearchCategory] = useState('multi');


  useEffect(() => {
    dispatch(onCategoryChange(searchCategory));
  }, [searchCategory]);


  const sendSearchRequest = (e, text, category) => {
    e.preventDefault();
    const urlFormattedText = text.replace(' ', '%20');
    const urlFormattedCategory = category.toLowerCase();
    dispatch(getDataFromSearch({ urlFormattedCategory, urlFormattedText }));
    dispatch(onCategoryChange(category));
  };

  return (
    <form onSubmit={(e) => sendSearchRequest(e, searchText, searchCategory)}>
      <select onChange={(e) => setSearchCategory(e.target.value)}>
        <option value='multi'>Multi</option>
        <option value='songs'>Songs</option>
        <option value='albums'>Albums</option>
        <option value='artists'>Artists</option>
        <option value='playlists'>Playlists</option>
      </select>
      <input type='search' onChange={(e) => setSearchText(e.target.value)} />
      <input type='submit' value='Search' />
    </form>
  )
};

export default Search;