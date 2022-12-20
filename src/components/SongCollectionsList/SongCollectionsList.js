import React from 'react';
import { useSelector } from 'react-redux';
import SongCollectionCard from '../SongCollectionCard/SongCollectionCard';
import { Alert, AlertTitle, AlertDescription, AlertIcon, Spinner, Flex, Box } from '@chakra-ui/react';

const SongCollectionsList = ({ collectionType }) => {

  const content = useSelector(state => {
    if (collectionType === 'ALBUMS') {
      return state.searchReducer?.searchResult?.albums?.items;
    }
    else if (collectionType === 'PLAYLISTS') {
      return state.searchReducer?.searchResult?.playlists?.items;
    }
    else if (collectionType === 'ARTIST_ALBUMS') {
      return state.artistInfoReducer?.artistTopAlbums?.items;
    }
  });

  const loadingStatus = useSelector(state => {
    if (collectionType === 'ARTIST_ALBUMS') {
      return state.artistInfoReducer.loadingStatus;
    }
    return state.searchReducer.loadingStatus;
  });

  const errorStatus = useSelector(state => {
    if (collectionType === 'ARTIST_ALBUMS') {
      return state.artistInfoReducer.errorStatus;
    }
    return state.searchReducer.errorStatus;
  });

  return (
    <Box data-testid='albums-list'>
      {errorStatus &&
        <Alert status='error' role='error-alert'>
          <AlertIcon />
          <AlertTitle>Something went wrong...</AlertTitle>
          <AlertDescription>Check the API response</AlertDescription>
        </Alert>}
      {loadingStatus === 'loading' && <Spinner w='150px' h='150px' role='spinner' />}

      {loadingStatus === 'resolved' &&
        <Flex flexWrap='wrap' gap='1.5em'>
          {content.map((item) =>
          (<SongCollectionCard
            key={item.uri}
            collectionType={collectionType}
            id={item.id} {...item}
          />))}
        </Flex>
      }
    </Box>
  )
};

export default SongCollectionsList;