import React from 'react';

import { Flex, Grid, Text, Spinner, Alert, AlertTitle, AlertDescription, AlertIcon } from '@chakra-ui/react';
import { useSelector } from 'react-redux';

import SongCollectionsList from '../../SongCollectionsList/SongCollectionsList';
import SongsList from '../../SongsList/SongsList';
import ArtistsList from '../../ArtistsList/ArtistsList';

const SearchResultsPage = () => {
  const currentSearchCategory = useSelector(state => state.searchReducer.searchCategory);
  const loadingStatus = useSelector(state => state.searchReducer.loadingStatus);
  const errorStatus = useSelector(state => state.searchReducer.errorStatus);

  const pageContent = () => {
    switch (currentSearchCategory) {
      case 'songs': {
        return (<Grid gridTemplateColumns='1fr 1fr 1fr' w='80%' m='5em auto 7em'><SongsList /></Grid>)
      }
      case 'albums': {
        return (<Flex flexWrap='wrap' justify='space-evenly' w='85%' m='5em auto 7em'><SongCollectionsList collectionType='ALBUMS' /></Flex>)
      }
      case 'playlists': {
        return (<Flex flexWrap='wrap' justify='space-evenly' w='85%' m='5em auto 7em'><SongCollectionsList collectionType='PLAYLISTS' /></Flex >)
      }
      case 'artists': {
        return (<Flex flexWrap='wrap' justify='space-evenly' w='70%' m='3em auto 7em'><ArtistsList /></Flex >)
      }
      default: {
        return (
          <>
            <Text w='100%' fontSize='2.5em' m='3em 0 1.5em' paddingInlineStart='5em'>SONGS</Text>
            <Grid gridTemplateColumns='1fr 1fr 1fr' w='80%' m='0 auto'>
              <SongsList />
            </Grid>

            <Text fontSize='2.5em' w='100%' m='3em 0 1.5em' paddingInlineStart='5em'>ALBUMS</Text>
            <Flex direction='row' justify='space-evenly' w='85%' m='0 auto' flexWrap='wrap' align='center'>
              <SongCollectionsList collectionType='ALBUMS' />
            </Flex>

            <Text fontSize='2.5em' w='100%' m='3em 0 1em' paddingInlineStart='5em'>ARTISTS</Text>
            <Flex direction='row' justify='space-evenly' w='70%' m='0 auto' flexWrap='wrap'>
              <ArtistsList />
            </Flex>

            <Text fontSize='2.5em' w='100%' m='3em 0 1.5em' paddingInlineStart='5em'>PLAYLISTS</Text>
            <Flex direction='row' justify='space-evenly' w='85%' m='0 auto 7em' flexWrap='wrap' align='center'>
              <SongCollectionsList collectionType='PLAYLISTS' />
            </Flex>
          </>
        )
      }
    }
  };


  return (
    <>
      {errorStatus &&
        <Alert status='error'>
          <AlertIcon />
          <AlertTitle>Something went wrong...</AlertTitle>
          <AlertDescription>Check the API response</AlertDescription>
        </Alert>}

      {loadingStatus === 'loading' && <Spinner w='150px' h='150px' />}

      {loadingStatus === 'resolved' && pageContent()}
    </>
  )
};
export default SearchResultsPage;