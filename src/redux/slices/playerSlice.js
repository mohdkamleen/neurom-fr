import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';

export const fetchPlayers = createAsyncThunk('players/fetchPlayers', async (teamId) => {
  const res = await axios.get(`/players/get-all`); 
  return res.data?.players;
});

const playerSlice = createSlice({
  name: 'players',
  initialState: {
  players: [], // players of players
  loading: false
},
  reducers: {
    addPlayer: (state, action) => {
      state.players.push(action.payload);
    },
    updatePlayer: (state, action) => {
      const idx = state.players.findIndex(p => p._id === action.payload._id);
      if (idx !== -1) state.players[idx] = action.payload;
    },
    deletePlayer: (state, action) => {
      state.players = state.players.filter(p => p._id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlayers.pending, (state) => { state.loading = true; })
      .addCase(fetchPlayers.fulfilled, (state, action) => {
        state.loading = false;
        state.players = action.payload;
      })
      .addCase(fetchPlayers.rejected, (state) => { state.loading = false; });
  }
});

export const { addPlayer, updatePlayer, deletePlayer } = playerSlice.actions;
export default playerSlice.reducer;
