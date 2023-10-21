import { configureStore } from '@reduxjs/toolkit';
import marioReducer from "./marioSlice";
import obstacleReducer from "./obstacleSlice";
import engineReducer from "./engineSlice";
import authReducer from "./authSlice";

export const store = configureStore({
  reducer: {
    mario: marioReducer,
    obstacle: obstacleReducer,
    engine: engineReducer,
    auth: authReducer,
  },
});