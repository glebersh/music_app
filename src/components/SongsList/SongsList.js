import React from 'react';
import { useSelector } from 'react-redux';
import SongCard from '../SongCard/SongCard';

const SongsList = () => {
  const content = useSelector(state => state.searchReducer.searchResult.tracks.items);

  const trackData = content.map((item) =>
  (<SongCard key={item.data.id} name={item.data.name}
    coverURL={item.data.albumOfTrack.coverArt.sources[1].url}
    id={item.data.id} albumOfTrack={item.data.albumOfTrack.name}
    artist={item.data.artists.items[0].profile.name}
    artistID={(item.data.artists.items[0].uri).replace('spotify:artist:', '')} />)
  )

  return (
    <>
      {trackData}
    </>
  )
};

export default SongsList;