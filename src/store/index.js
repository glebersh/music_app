import { configureStore } from "@reduxjs/toolkit";

import searchReducer from '../store/slices/searchSlice';
import artistInfoReducer from '../store/slices/artistInfoSlice';
import playerReducer from '../store/slices/playerSlice';
import authReducer from '../store/slices/authSlice';


export default configureStore({
  reducer: {
    searchReducer,
    artistInfoReducer,
    playerReducer,
    authReducer,
  }
});