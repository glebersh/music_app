import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getArtistData } from '../../../store/slices/artistInfoSlice';


const ArtistPage = () => {
  let { artistID } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getArtistData(artistID))
  }, []);


  const data = useSelector(state => state.artistInfoReducer.artistInfo.artists);
  const loading = useSelector(state => state.artistInfoReducer.isLoading);

  return (
    <div>
      {loading ? <h1>Loading...</h1> :
        (
          <>
            <img src={data[0].images[0].url} />
            <p>{data[0].name}</p>
            <p>{data[0].popularity}</p>
            <p>{data[0].genres[0]}</p>
            <p>{data[0].followers.total}</p>
          </>
        )}
      <Link to='/'>BACK TO SEARCH</Link>
    </div>
  )
};
export default ArtistPage;