import React from 'react';
import { useSelector } from 'react-redux';
import { Flex, Text } from '@chakra-ui/react';

import Header from '../../Header';
import SongCollectionsList from '../../SongCollectionsList/SongCollectionsList';
import SongsList from '../../SongsList/SongsList';
import ArtistsList from '../../ArtistsList/ArtistsList';
import TopResultCard from '../../TopResultCard/TopResultCard';

const SearchResultsPage = () => {
  const isEmpty = useSelector(state => state.searchReducer.isEmpty);
  const currentSearchCategory = useSelector(state => state.searchReducer.searchCategory);

  const pageContent = () => {
    switch (currentSearchCategory) {
      case 'multi': {
        return (
          <>
            <Text w='100%' fontSize='2.5em' m='3em 0 1.5em' paddingInlineStart='5em'>TOP RESULTS</Text>
            <Flex direction='row' justify='space-between' w='90%' flexWrap='wrap'>
              <TopResultCard />
              <Flex flex='1' ml='3em' flexWrap='wrap'>
                <SongsList />
              </Flex>
            </Flex>
            <Text fontSize='2.5em' w='100%' m='3em 0 1.5em' paddingInlineStart='5em'>ALBUMS</Text>
            <Flex direction='row' justify='space-evenly' w='90%' flexWrap='wrap'>
              <SongCollectionsList type='albums' />
            </Flex>
            <Text fontSize='2.5em' w='100%' m='3em 0 1em' paddingInlineStart='5em'>ARTISTS</Text>
            <Flex direction='row' justify='space-evenly' w='70%' flexWrap='wrap'>
              <ArtistsList />
            </Flex>
            <Text fontSize='2.5em' w='100%' m='3em 0 1.5em' paddingInlineStart='5em'>PLAYLISTS</Text>
            <Flex direction='row' justify='space-evenly' w='90%' flexWrap='wrap'>
              <SongCollectionsList type='playlists' />
            </Flex>
          </>
        )
      }
      case 'songs': {
        return (
          <>
            <SongsList />
          </>
        )
      }
      case 'albums': {
        return (
          <>
            <SongCollectionsList type='albums' />
          </>
        )
      }

      case 'playlists': {
        return (
          <>
            <SongCollectionsList type='playlists' />
          </>
        )
      }
      case 'artists': {
        return (
          <>
            <ArtistsList />
          </>
        )
      }
    }
  };


  return (
    <>
      <Header />
      {
        isEmpty ? null :
          <>
            {pageContent()}
          </>
      }
    </>
  )
};
export default SearchResultsPage;