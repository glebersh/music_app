import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: 'authToken',
  initialState: '',
  reducers: {
    setAuthToken(_, action) {
      return action.payload;
    }
  }
});
export const { setAuthToken } = authSlice.actions;
export default authSlice.reducer;

const authSelector = (state) => state.authReducer; 