import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { accessToken } = action.payload;
      state.token = accessToken;
    },

    logout: (state, action) => {
      state.token = null;
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export const selectToken = (state) => state.auth.token;

export default authSlice.reducer;
