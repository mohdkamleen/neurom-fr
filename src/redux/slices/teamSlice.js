import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';

// Async thunk to fetch a team for a user
export const fetchTeams = createAsyncThunk('teams/fetchTeams', async (userId) => {
  const res = await axios.get(`/teams/${userId}`);
  return res.data; // ← confirm this is a single team object
});

const teamSlice = createSlice({
  name: 'teams',
  initialState: {
    team: null,
    loading: false,
  },
  reducers: {
    addTeam: (state, action) => {
      state.team = action.payload;
    },
    updateTeam: (state, action) => {
      state.team = action.payload;
    },
    removeTeam: (state) => {
      state.team = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTeams.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTeams.fulfilled, (state, action) => {
        state.loading = false;
        state.team = action.payload;
      })
      .addCase(fetchTeams.rejected, (state) => {
        state.loading = false;
        state.team = null;
      });
  }
});

export const { addTeam, updateTeam, removeTeam } = teamSlice.actions;
export default teamSlice.reducer;
