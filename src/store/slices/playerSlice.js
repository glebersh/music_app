import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";


export const getSongCollectionTracks = createAsyncThunk(
  'playerData/getSongCollectionTracks',
  async function ({ id, playlistType }, { dispatch, getState }) {
    const state = getState();
    await fetch(`https://api.spotify.com/v1/${playlistType}/${id}?market=US`,
      {
        headers: {
          Authorization: `Bearer ${state.authReducer}`,
        }
      })
      .then(result => result.json())
      .then(result => dispatch(setSongsCollection(result)))
      .then(() => dispatch(setSongsCollectionType(playlistType)))
      .catch(error => console.log(error.message));
  });


const playerSlice = createSlice({
  name: 'playerData',
  initialState: {
    songsCollection: {},
    songsCollectionType: 'songs',
    isPlaying: false,
    currentSong: {},
    previousSong: {},
    nextSong: {},
  },
  reducers: {
    setSongsCollection(state, action) {
      state.songsCollection = action.payload;
      state.currentSong = state.songsCollectionType === 'albums' || state.songsCollectionType === 'playlists' ? state.songsCollection.tracks.items[0] : state.currentSong;
    },
    setSongsCollectionType(state, action) {
      state.songsCollectionType = action.payload;
    },
    setIsPlaying(state) {
      state.isPlaying = !state.isPlaying;
    },
    setIsPlayingTrue(state) {
      state.isPlaying = true;
    },
    setCurrentSong(state, action) {
      state.currentSong = action.payload;
    },
    setPreviousSong(state, action) {
      state.previousSong = action.payload;
    },
    setNextSong(state, action) {
      state.nextSong = action.payload;
    },
  }
});

export const { setSongsCollection,
  setSongsCollectionType,
  setIsPlaying,
  setIsPlayingTrue,
  setCurrentSong,
  setPreviousSong,
  setNextSong } = playerSlice.actions;

export default playerSlice.reducer;