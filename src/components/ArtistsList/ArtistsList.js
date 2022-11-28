import React from 'react';
import { useSelector } from 'react-redux';
import ArtistCard from '../ArtistCard/ArtistCard';

const ArtistsList = () => {
  const content = useSelector(state => state.searchReducer.searchResult.artists.items);

  const artistsData = content.map((item) =>
  (<ArtistCard
    key={item.id}
    artistID={item.id}
    name={item.name}
    imgURL={item.images[1] ? item.images[1].url : null}
    width={item.images[1] ? item.images[1].width : null}
  />)
  )

  return (
    <>
      {artistsData}
    </>
  )
};

export default ArtistsList;