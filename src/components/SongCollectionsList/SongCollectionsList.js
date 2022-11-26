import React from 'react';
import { useSelector } from 'react-redux';
import SongCollectionCard from '../SongCollectionCard/SongCollectionCard';

const SongCollectionsList = ({ type }) => {

  const content = useSelector(state => {
    if (type === 'ALBUMS') {
      return state.searchReducer.searchResult.albums.items;
    }
    else if (type === 'PLAYLISTS') {
      return state.searchReducer.searchResult.playlists.items;
    }
    else if (type === 'ARTIST_ALBUMS') {
      return state.artistInfoReducer.artistTopAlbums.items;
    }
  });


  const songCollectionData = content.map((item) =>
  (<SongCollectionCard
    key={item.uri}
    name={item.name}
    type={type}
    owner={type === 'PLAYLISTS' ? item.owner.display_name : null}
    coverURL={type === 'ALBUMS' ? item.images[1].url : item.images[0].url}
    id={item.uri}
    artist={type === 'ALBUMS' ? item.artists[0].name : null}
    artistID={type === 'ALBUMS' ? item.artists[0].id : null} />)
  )

  return (
    <>
      {songCollectionData}
    </>
  )
};

export default SongCollectionsList;