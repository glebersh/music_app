import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import './Search.css';

import { getDataFromSearch, onCategoryChange } from '../../store/slices/searchSlice';

import { Box, Flex, Input, Tag } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const Search = () => {
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState();
  const [searchCategory, setSearchCategory] = useState('multi');

  useEffect(() => {
    dispatch(onCategoryChange(searchCategory));
  }, [searchCategory]);

  const navigate = useNavigate();

  const sendSearchRequest = (e, text, category) => {
    e.preventDefault();
    const urlFormattedText = text.replace(' ', '%20');
    dispatch(getDataFromSearch(urlFormattedText));
    dispatch(onCategoryChange(category));
    navigate('/');
  };

  const hoverStyle = {
    transition: '.33s',
    cursor: 'pointer',
    color: 'primary'
  };

  return (
    <Box w='100%'>
      <form onSubmit={(e) => sendSearchRequest(e, searchText, searchCategory)}>
        <Flex direction='row' flexWrap='wrap' justify='flex-start' align='center'>
          <Input type='search' onChange={(e) => setSearchText(e.target.value)}
            display='inline-block' w='50%'
            role='search' />
          <Input type='submit' value='Search'
            role='search-submit-button'
            _hover={hoverStyle}
            w='10%' minW='100px'
            ml='2em'
            display='inline-block' />
        </Flex>
        <Flex direction='row' flexWrap='wrap' justify='flex-start' align='center'
          mt='1.5em' gap='1em'>
          <Tag onClick={() => setSearchCategory('multi')}
            transition='.33s'
            _hover={hoverStyle}
            _active={{ transform: 'scale(0.97,0.97)' }}
            role='search-filter-button'>Multi</Tag>
          <Tag onClick={() => setSearchCategory('songs')}
            transition='.33s'
            _hover={hoverStyle}
            _active={{ transform: 'scale(0.97,0.97)' }}
            role='search-filter-button'>Songs</Tag>
          <Tag onClick={() => setSearchCategory('albums')}
            transition='.33s'
            _hover={hoverStyle}
            _active={{ transform: 'scale(0.97,0.97)' }}
            role='search-filter-button'>Albums</Tag>
          <Tag onClick={() => setSearchCategory('artists')}
            transition='.33s'
            _hover={hoverStyle}
            _active={{ transform: 'scale(0.97,0.97)' }}
            role='search-filter-button'>Artists</Tag>
          <Tag onClick={() => setSearchCategory('playlists')}
            _hover={hoverStyle}
            _active={{ transform: 'scale(0.97,0.97)' }}
            role='search-filter-button'>Playlists</Tag>
        </Flex>
      </form>
    </Box >
  )
};

export default Search;