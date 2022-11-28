import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { setCurrentSong, setSongsCollection } from "./playerSlice";

export const getDataFromSearch = createAsyncThunk(
  'artist/getDataFromSearch',

  async function (urlFormattedText, { dispatch, getState }) {
    const state = getState();
    const response = await fetch(`https://api.spotify.com/v1/search?q=${urlFormattedText}&type=artist,track,album,playlist&market=US&limit=15`,
      {
        headers: {
          Authorization: `Bearer ${state.authReducer}`,
        }
      })
    const data = await response.json();
    dispatch(onSearch(data));
    dispatch(setSongsCollection(data.tracks));
    dispatch(setCurrentSong(data.tracks.items[0]));
  });


const searchSlice = createSlice({
  name: 'spotify',
  initialState: {
    searchResult: {},
    isEmpty: true,
    searchCategory: 'multi',
    isLoading: true,
  },
  reducers: {
    onSearch(state, action) {
      state.searchResult = action.payload;
      state.isEmpty = false;
      state.isLoading = false;
    },
    onLoading(state) {
      state.isLoading = true;
    },
    onCategoryChange(state, action) {
      state.searchCategory = action.payload;
    }
  }
});

export const { onSearch, onCategoryChange, onLoading } = searchSlice.actions;
export default searchSlice.reducer;