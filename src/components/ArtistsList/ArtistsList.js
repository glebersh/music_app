import React from 'react';
import { useSelector } from 'react-redux';
import ArtistCard from '../ArtistCard/ArtistCard';

const ArtistsList = () => {
  const content = useSelector(state => state.searchReducer.searchResult.artists.items);

  const artistsData = content.map((item) =>
  (<ArtistCard key={item.data.uri}
    artistID={(item.data.uri).replace('spotify:artist:', '')}
    name={item.data.profile.name}
    imgURL={item.data.visuals.avatarImage.sources[1].url}
  />)
  )

  return (
    <>
      {artistsData}
    </>
  )
};

export default ArtistsList;