import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  UserId: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.UserId = action.payload.id;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.UserId = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
