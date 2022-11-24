import React from 'react';
import ArtistCard from '../ArtistCard/ArtistCard';
import { useSelector } from 'react-redux';

const TopResultCard = () => {
  const { data } = useSelector(state => state.searchReducer.searchResult.topResults.items[0]);
  return (
    <ArtistCard uri={data.uri}
      type='topResult'
      name={data.profile.name}
      imgURL={data.visuals.avatarImage.sources[0].url}
      artistID={(data.uri).replace('spotify:artist:', '')} />
  )
};

export default TopResultCard;