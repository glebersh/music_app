import React from 'react';
import { useSelector } from 'react-redux';

import Header from '../../Header';
import SongCollectionsList from '../../SongCollectionsList/SongCollectionsList';
import SongsList from '../../SongsList/SongsList';
import ArtistsList from '../../ArtistsList/ArtistsList';
import TopResultCard from '../../TopResultCard/TopResultCard';

const SearchResultsPage = () => {
  const isEmpty = useSelector(state => state.searchReducer.isEmpty);
  const currentSearchCategory = useSelector(state => state.searchReducer.searchCategory);

  const pageContent = () => {
    switch (currentSearchCategory) {
      case 'multi': {
        return (
          <>
            <ArtistsList />
            <TopResultCard />
            <SongsList />
            <SongCollectionsList type='albums' />

            <SongCollectionsList type='playlists' />
          </>
        )
      }
      case 'songs': {
        return (
          <>
            <SongsList />
          </>
        )
      }
      case 'albums': {
        return (
          <>
            <SongCollectionsList type='albums' />
          </>
        )
      }

      case 'playlists': {
        return (
          <>
            <SongCollectionsList type='playlists' />
          </>
        )
      }
      case 'artists': {
        return (
          <>
            <ArtistsList />
          </>
        )
      }
    }
  };


  return (
    <>
      <Header />
      {
        isEmpty ? null :
          <>
            {pageContent()}
          </>
      }
    </>
  )
};
export default SearchResultsPage;