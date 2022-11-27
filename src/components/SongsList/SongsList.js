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


  const trackData = content.map((item, index) => {
    let nextItem = content[index + 1];

    return (<SongCard key={item.id}
      duration={item.duration_ms}
      name={item.name}
      coverURL={item.album.images ? item.album.images[2].url : null}
      id={item.id}
      albumOfTrack={item.album.name}
      artist={item.artists[0].name}
      artistID={item.artists[0].id}
      explicit={item.explicit}
      playURL={item.preview_url}
      nextSong={nextItem}
    />)
  })

  return (
    <>
      {trackData}
    </>
  )
};

export default SongsList;