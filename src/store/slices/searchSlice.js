import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

const fetchOptions = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': '56ab86c4admsh2ce0507f444bfd2p1b8c1ajsnfcd367fa3383',
    'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
  }
};

export const getDataFromSearch = createAsyncThunk(
  'artist/setArtistAsync',
  async function ({ urlFormattedCategory, urlFormattedText }, { dispatch }) {
    try {
      dispatch(onLoading())
      const response = await fetch(`https://spotify23.p.rapidapi.com/search/?q=${urlFormattedText}&type=${urlFormattedCategory}&offset=0&limit=10&numberOfTopResults=5`,
        fetchOptions)
      if (!response.ok) {
        throw new Error('Item was not deleted due to an occurred error');
      }
      const data = await response.json();
      dispatch(onSearch(data));
    } catch (error) {
      console.log(error.message);
      return;
    }
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