import React, { useEffect } from 'react';
import './App.css';

import SearchResultsPage from '../pages/SearchResultsPage';
import { Routes, Route } from 'react-router-dom';
import ArtistPage from '../pages/ArtistPage';
import Layout from '../pages/Layout';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthToken } from '../../store/slices/authSlice';
import LoginPage from '../pages/LoginPage';

const CLIENT_ID = "ea5fd0d4cfe147699b87b05db7e6f7bb"
const CLIENT_SECRET = "3d64fc393dcb413891e91ac4dda2fd47"
const REDIRECT_URI = "http://localhost:3000/"
const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
const RESPONSE_TYPE = "token";


export const authEndpoint = 'https://accounts.spotify.com/authorize';
// Replace with your app's client ID, redirect URI and desired scopes
const scopes = [
  "user-read-currently-playing",
  "user-read-playback-state",
];
// Get the hash of the url
const hash = window.location.hash
  .substring(1)
  .split("&")
  .reduce(function (initial, item) {
    if (item) {
      var parts = item.split("=");
      initial[parts[0]] = decodeURIComponent(parts[1]);
    }
    return initial;
  }, {});
window.location.hash = "";

const App = () => {
  const token = useSelector(state => state.authReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    let _token = hash.access_token;
    if (_token) {
      // Set token
      dispatch(setAuthToken(_token));
    }
  }, []);


  return (
    <>
      {!token ?
        <LoginPage /> :
        <>
          <Routes>
            <Route element={<Layout />}>
              <Route path='/' index element={<SearchResultsPage />} />
              <Route path="artists/:artistID" element={<ArtistPage />} />
            </Route>
          </Routes>
        </>}
    </>
  )
};

export default App;