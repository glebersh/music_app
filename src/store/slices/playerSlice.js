import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";


export const getSongCollectionTracks = createAsyncThunk(
  'playerData/getSongCollectionTracks',
  async function ({ id, playlistType }, { dispatch, getState, rejectWithValue }) {
    try {
      const state = getState();
      const repsonse = await fetch(`https://api.spotify.com/v1/${playlistType}/${id}?market=US`,
        {
          headers: {
            Authorization: `Bearer ${state.authReducer}`,
          }
        })
      const data = await repsonse.json();
      dispatch(setSongsCollectionType(playlistType));
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
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
    loadingStatus: '',
    errorStatus: null,
  },
  reducers: {
    setSongsCollection(state, action) {
      state.songsCollection = action.payload;
      state.loadingStatus = 'resolved';
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
      state.loadingStatus = 'resolved';
    },
    setPreviousSong(state, action) {
      state.previousSong = action.payload;
    },
    setNextSong(state, action) {
      state.nextSong = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSongCollectionTracks.pending, (state, action) => {
        state.loadingStatus = 'loading';
      })
      .addCase(getSongCollectionTracks.fulfilled, (state, action) => {
        state.songsCollection = action.payload;
        state.currentSong = state.songsCollectionType === 'albums'
          || state.songsCollectionType === 'playlists' ?
          state.songsCollection?.tracks?.items[0] : state.currentSong;
        state.loadingStatus = 'resolved';
      })
      .addCase(getSongCollectionTracks.rejected, (state, action) => {
        state.errorStatus = action.payload;
        state.loadingStatus = 'rejected';
      })
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