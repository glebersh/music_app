import React from 'react';
import { useSelector } from 'react-redux';
import SongCollectionCard from '../SongCollectionCard/SongCollectionCard';

const SongCollectionsList = ({ type }) => {

  const content = useSelector(state => {
    if (type === 'albums') {
      return state.searchReducer.searchResult.albums.items;
    }
    else if (type === 'playlists') {
      return state.searchReducer.searchResult.playlists.items;
    }
  });


  const songCollectionData = content.map((item) =>
  (<SongCollectionCard key={item.data.uri} name={item.data.name} type={type} owner={type === 'playlists' ? item.data.owner.name : null}
    coverURL={type === 'albums' ? item.data.coverArt.sources[0].url : item.data.images.items[0].sources[0].url}
    id={item.data.uri} artist={type === 'albums' ? item.data.artists.items[0].profile.name : null}
    artistID={type === 'albums' ? item.data.artists.items[0].uri.replace('spotify:artist:', '') : null} />)
  )

  return (
    <>
      {songCollectionData}
    </>
  )
};

export default SongCollectionsList;