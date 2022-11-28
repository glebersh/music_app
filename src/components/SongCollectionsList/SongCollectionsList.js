import React from 'react';
import { useSelector } from 'react-redux';
import SongCollectionCard from '../SongCollectionCard/SongCollectionCard';

const SongCollectionsList = ({ collectionType }) => {

  const content = useSelector(state => {
    if (collectionType === 'ALBUMS') {
      return state.searchReducer.searchResult.albums.items;
    }
    else if (collectionType === 'PLAYLISTS') {
      return state.searchReducer.searchResult.playlists.items;
    }
    else if (collectionType === 'ARTIST_ALBUMS') {
      return state.artistInfoReducer.artistTopAlbums.items;
    }
  });

  const songCollectionData = content.map((item) =>
  (<SongCollectionCard
    key={item.uri}
    collectionType={collectionType}
    id={item.id} {...item}
  />))

  return (
    <>
      {songCollectionData}
    </>
  )
};

export default SongCollectionsList;