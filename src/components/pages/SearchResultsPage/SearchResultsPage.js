import React from 'react';

import { Flex, Grid, Text, Spinner } from '@chakra-ui/react';
import { useSelector } from 'react-redux';

import SongCollectionsList from '../../SongCollectionsList/SongCollectionsList';
import SongsList from '../../SongsList/SongsList';
import ArtistsList from '../../ArtistsList/ArtistsList';

const SearchResultsPage = () => {
  const isEmpty = useSelector(state => state.searchReducer.isEmpty);
  const isLoading = useSelector(state => state.searchReducer.isLoading);
  const currentSearchCategory = useSelector(state => state.searchReducer.searchCategory);

  const pageContent = () => {
    switch (currentSearchCategory) {
      case 'songs': {
        return (<Grid gridTemplateColumns='1fr 1fr 1fr 1fr 1fr' gridTemplateRows='1fr 1fr 1fr' w='90%' m='0 auto 0 10em'><SongsList /></Grid>)
      }
      case 'albums': {
        return (<Flex flexWrap='wrap' justify='space-evenly' w='90%' mt='3em'><SongCollectionsList collectionType='ALBUMS' /></Flex>)
      }
      case 'playlists': {
        return (<Flex flexWrap='wrap' justify='space-evenly' w='90%' mt='3em'><SongCollectionsList collectionType='PLAYLIST' /></Flex >)
      }
      case 'artists': {
        return (<Flex flexWrap='wrap' justify='space-evenly' w='90%' mt='3em'><ArtistsList /></Flex >)
      }
      default: {
        return (
          <>
            <Text w='100%' fontSize='2.5em' m='3em 0 1.5em' paddingInlineStart='5em'>SONGS</Text>
            <Grid gridTemplateColumns='1fr 1fr 1fr' w='80%'>
              <SongsList />
            </Grid>

            <Text fontSize='2.5em' w='100%' m='3em 0 1.5em' paddingInlineStart='5em'>ALBUMS</Text>
            <Flex direction='row' justify='space-evenly' w='90%' flexWrap='wrap'>
              <SongCollectionsList collectionType='ALBUMS' />
            </Flex>

            <Text fontSize='2.5em' w='100%' m='3em 0 1em' paddingInlineStart='5em'>ARTISTS</Text>
            <Flex direction='row' justify='space-evenly' w='70%' flexWrap='wrap'>
              <ArtistsList />
            </Flex>

            {/* <Text fontSize='2.5em' w='100%' m='3em 0 1.5em' paddingInlineStart='5em'>PLAYLISTS</Text>
            <Flex direction='row' justify='space-evenly' w='90%' flexWrap='wrap'>
              <SongCollectionsList collectionType='PLAYLISTS' />
            </Flex> */}
          </>
        )
      }
    }
  };


  return (
    <>
      {isEmpty ? null : isLoading ? <Spinner w='200px' h='200px' /> : <>{pageContent()}</>}
    </>
  )
};
export default SearchResultsPage;