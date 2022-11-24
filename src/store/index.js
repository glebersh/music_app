import { configureStore } from "@reduxjs/toolkit";

import searchReducer from '../store/slices/searchSlice';
import artistInfoReducer from '../store/slices/artistInfoSlice';


export default configureStore({
  reducer: {
    searchReducer,
    artistInfoReducer,
  }
});