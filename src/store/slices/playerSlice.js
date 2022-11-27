import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

const playerSlice = createSlice({
  name: 'playerData',
  initialState: {
    songs: null,
    currentSong: '',
    currentSongID: '',
    currentSongGeneral: {},
    isPlaying: false,
    previousSong: '',
    previousSongID: '',
    nextSong: {},

  },
  reducers: {
    setSongs(state, action) {
      state.songs = action.payload;
    },
    setCurrentSong(state, action) {
      state.currentSong = action.payload;
    },
    setCurrentSongID(state, action) {
      state.currentSongID = action.payload;
    },
    setCurrentSongGeneral(state, action) {
      state.currentSongGeneral = action.payload;
    },
    setIsPlaying(state) {
      state.isPlaying = !state.isPlaying;
    },
    setPreviousSong(state, action) {
      state.previousSong = action.payload.currentSongURL;
      state.previousSongID = action.payload.currentSongID;
    },
    setNextSong(state, action) {
      state.nextSong = action.payload;
    },
  }
});

export const { setSongs, setCurrentSong,
  setIsPlaying, setCurrentSongID,
  setPreviousSong, setCurrentSongGeneral,
  setNextSong } = playerSlice.actions;
export default playerSlice.reducer;