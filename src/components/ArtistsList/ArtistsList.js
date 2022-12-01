import React from 'react';
import { useSelector } from 'react-redux';
import ArtistCard from '../ArtistCard/ArtistCard';
import { Alert, AlertTitle, AlertDescription, AlertIcon, Spinner } from '@chakra-ui/react';

const ArtistsList = () => {
  const content = useSelector(state => state.searchReducer.searchResult.artists.items);
  const loadingStatus = useSelector(state => state.searchReducer.loadingStatus);
  const errorStatus = useSelector(state => state.searchReducer.errorStatus);

  const artistsData = content.map((item) =>
  (<ArtistCard
    key={item.id}
    artistID={item.id}
    name={item?.name}
    imgURL={item?.images[1]?.url}
    width={item?.images[1]?.width}
  />)
  )

  return (
    <>
      {errorStatus &&
        <Alert status='error'>
          <AlertIcon />
          <AlertTitle>Something went wrong...</AlertTitle>
          <AlertDescription>Check the API response</AlertDescription>
        </Alert>}
      {loadingStatus === 'loading' && <Spinner w='150px' h='150px' />}
      {loadingStatus === 'resolved' && artistsData}
    </>
  )
};

export default ArtistsList;