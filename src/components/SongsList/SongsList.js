import React from 'react';
import { useSelector } from 'react-redux';
import SongCard from '../SongCard/SongCard';

const SongsList = ({ type }) => {

  const content = useSelector(state => {
    if (type === 'ARTIST_TOP_TRACKS') {
      return state.artistInfoReducer.artistTopTracks.tracks;
    }
    return state.searchReducer.searchResult.tracks.items;
  });


  const trackData = content.map((item, index, array) => {
    let nextItem = array[index + 1];

    return (<SongCard key={item.id}
      {...item}
    />)
  })

  return (
    <>
      {trackData}
    </>
  )
};

export default SongsList;