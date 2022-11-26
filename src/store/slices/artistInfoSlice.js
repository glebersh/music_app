import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getArtistGeneral = createAsyncThunk(
  'artist/getArtistGeneral',
  async function (artistID, { dispatch, getState }) {
    const state = getState();
    await fetch(`https://api.spotify.com/v1/artists/${artistID}`,
      {
        headers: {
          Authorization: `Bearer ${state.authReducer}`,
        }
      })
      .then(response => response.json())
      .then(response => dispatch(setArtist(response)))
      .catch(error => console.log(error.message));
  });

export const getArtistTopTracks = createAsyncThunk(
  'artist/getArtistTopTracks',
  async function (artistID, { dispatch, getState }) {
    const state = getState();
    await fetch(`https://api.spotify.com/v1/artists/${artistID}/top-tracks?market=US`,
      {
        headers: {
          Authorization: `Bearer ${state.authReducer}`,
        }
      })
      .then(response => response.json())
      .then(response => dispatch(setArtistTopTracks(response)))
      .catch(error => console.log(error.message));
  });


export const getArtistTopAlbums = createAsyncThunk(
  'artist/getArtistTopAlbums',
  async function (artistID, { dispatch, getState }) {
    const state = getState();
    await fetch(`https://api.spotify.com/v1/artists/${artistID}/albums?market=US&limit=10`,
      {
        headers: {
          Authorization: `Bearer ${state.authReducer}`,
        }
      })
      .then(response => response.json())
      .then(response => dispatch(setArtistTopAlbums(response)))
      .catch(error => console.log(error.message));
  });


const artistInfoSlice = createSlice({
  name: 'artistInfo',
  initialState: {
    artistInfo: {},
    artistTopTracks: {},
    artistTopAlbums: {},
    isLoading: true,
  },
  reducers: {
    setArtist(state, action) {
      state.artistInfo = action.payload;
    },
    setArtistTopTracks(state, action) {
      state.artistTopTracks = action.payload;
    },
    setArtistTopAlbums(state, action) {
      state.artistTopAlbums = action.payload;
      state.isLoading = false;
    }
  }
});

export const {
  setArtist,
  setLoading,
  setArtistTopTracks,
  setArtistTopAlbums } = artistInfoSlice.actions;

export default artistInfoSlice.reducer;