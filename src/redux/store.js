import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import teamReducer from './slices/teamSlice';
import playerReducer from './slices/playerSlice'; 

export const store = configureStore({
  reducer: {
    auth: authReducer,
    teams: teamReducer,
    players: playerReducer
  },
});
