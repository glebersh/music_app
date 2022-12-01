import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { setCurrentSong, setSongsCollection } from "./playerSlice";

export const getDataFromSearch = createAsyncThunk(
  'artist/getDataFromSearch',

  async function (urlFormattedText, { dispatch, getState, rejectWithValue }) {
    try {
      const state = getState();
      const response = await fetch(`https://api.spotify.com/v1/search?q=${urlFormattedText}&type=artist,track,album,playlist&market=US&limit=15`,
        {
          headers: {
            Authorization: `Bearer ${state.authReducer}`,
          }
        })
      const data = await response.json();
      dispatch(setCurrentSong(data.tracks.items[0]));
      dispatch(setSongsCollection(data.tracks));
      return data;
    }
    catch (error) {
      return rejectWithValue(error.message);
    }
  });


const searchSlice = createSlice({
  name: 'spotify',
  initialState: {
    searchResult: {},
    searchCategory: 'multi',
    loadingStatus: '',
    errorStatus: null,
  },
  reducers: {
    onSearch(state, action) {
      state.searchResult = action.payload;
    },
    onCategoryChange(state, action) {
      state.searchCategory = action.payload;
    }
  },
  extraReducers: {
    [getDataFromSearch.pending]: (state) => {
      state.loadingStatus = 'loading';
    },
    [getDataFromSearch.fulfilled]: (state, action) => {
      state.searchResult = action.payload;
      state.loadingStatus = 'resolved';
    },
    [getDataFromSearch.rejected]: (state, action) => {
      state.errorStatus = action.payload;
      state.loadingStatus = 'rejected';
    }
  }
});

export const { onSearch, onCategoryChange, onLoading } = searchSlice.actions;
export default searchSlice.reducer;