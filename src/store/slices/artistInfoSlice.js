import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

const fetchOptions = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': '56ab86c4admsh2ce0507f444bfd2p1b8c1ajsnfcd367fa3383',
    'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
  }
};



export const getArtistData = createAsyncThunk(
  'artist/getArtistData',
  async function (artistID, { dispatch }) {
    const response = await fetch(`https://spotify23.p.rapidapi.com/artists/?ids=${artistID}`,
      fetchOptions)
    const data = await response.json();
    dispatch(setArtist(data));
  });



const artistInfoSlice = createSlice({
  name: 'artistInfo',
  initialState: {
    artistInfo: {},
    isLoading: true,
  },
  reducers: {
    setArtist(state, action) {
      state.artistInfo = action.payload;
      state.isLoading = false;
    }
  }
});

export const { setArtist, setLoading } = artistInfoSlice.actions;
export default artistInfoSlice.reducer;