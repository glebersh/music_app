import React from 'react';
import { useSelector } from 'react-redux';
import SongCollectionCard from '../SongCollectionCard/SongCollectionCard';
import { Alert, AlertTitle, AlertDescription, AlertIcon, Spinner } from '@chakra-ui/react';

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

  const loadingStatus = useSelector(state => state.searchReducer.loadingStatus);
  const errorStatus = useSelector(state => state.searchReducer.errorStatus);

  return (
    <>
      {errorStatus &&
        <Alert status='error'>
          <AlertIcon />
          <AlertTitle>Something went wrong...</AlertTitle>
          <AlertDescription>Check the API response</AlertDescription>
        </Alert>}
      {loadingStatus === 'loading' && <Spinner w='150px' h='150px' />}
      {loadingStatus === 'resolved' &&
        content.map((item) =>
        (<SongCollectionCard
          key={item.uri}
          collectionType={collectionType}
          id={item.id} {...item}
        />))}
    </>
  )
};

export default SongCollectionsList;