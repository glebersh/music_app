import React from 'react';
import { useSelector } from 'react-redux';
import SongCard from '../SongCard/SongCard';
import { Alert, AlertTitle, AlertDescription, AlertIcon, Spinner } from '@chakra-ui/react';

const SongsList = ({ type }) => {

  const content = useSelector(state => {
    if (type === 'ARTIST_TOP_TRACKS') {
      return state.artistInfoReducer?.artistTopTracks?.tracks;
    }
    return state.searchReducer?.searchResult?.tracks?.items;
  });

  const loadingStatus = useSelector(state => {
    if (type === 'ARTIST_TOP_TRACKS') {
      return state.artistInfoReducer.loadingStatus;
    }
    return state.searchReducer.loadingStatus;
  });

  const errorStatus = useSelector(state => {
    if (type === 'ARTIST_TOP_TRACKS') {
      return state.artistInfoReducer.errorStatus;
    }
    return state.searchReducer.errorStatus;
  });

  return (
    <>
      {errorStatus &&
        <Alert status='error' role='error-alert'>
          <AlertIcon />
          <AlertTitle>Something went wrong...</AlertTitle>
          <AlertDescription>Check the API response</AlertDescription>
        </Alert>}

      {loadingStatus === 'loading' && <Spinner w='150px' h='150px' role='spinner' />}

      {loadingStatus === "resolved" && content.map((item, index) => {
        return (<SongCard
          key={item.id}
          {...item}
          arrayPosition={index}
        />)
      })}
    </>
  )
};

export default SongsList;