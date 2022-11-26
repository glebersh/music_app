import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

const fetchOptions = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': '56ab86c4admsh2ce0507f444bfd2p1b8c1ajsnfcd367fa3383',
    'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
  }
};

export const setPlaybleURls = createAsyncThunk(
  'playerData/setPlaybleURls',
  async function (ids, { dispatch }) {
    try {
      const idFormatted = ids.toString();
      const response = await fetch(`https://spotify23.p.rapidapi.com/tracks/?ids=${idFormatted}`,
        fetchOptions)
      if (!response.ok) {
        throw new Error('Item was not deleted due to an occurred error');
      }
      const data = await response.json();
      dispatch(setPlaybleUrls(data.tracks.map(item => item.preview_url)));
    } catch (error) {
      console.log(error.message);
      return;
    }
  });

const playerSlice = createSlice({
  name: 'playerData',
  initialState: {
    songs: null,
    playbleURLs: null,
  },
  reducers: {
    setSongs(state, action) {
      state.songs = action.payload;
    },
    setPlaybleUrls(state, action) {
      state.playbleURLs = action.payload;
    }
  }
});

export const { setSongs, setPlaybleUrls } = playerSlice.actions;
export default playerSlice.reducer;