import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define initial state
const initialState = {
  tasks: [],
  loading: false,
  error: null,
};

// Define the async thunk
export const getMyTasks = createAsyncThunk(
  'task/getMyTasks',
  async (userId, thunkAPI) => {
    try {
      const response = await axios.get(`http://localhost:8000/task/mytask/${userId}`);
      return response.data.tasks;
    } catch (error) {
      console.error('Error fetching tasks:', error);
      const message = error.response && error.response.data && error.response.data.message
        ? error.response.data.message
        : error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const removetask = createAsyncThunk(
  "task/removetask",
  async (id, thunkAPI) => {
    try {
      const response = await axios.put(`http://localhost:8000/task/trash/${id}`);
      if (response.status === 200) {
        return id; // Return the id of the trashed task
      }
    } catch (error) {
      console.error("Error removing task:", error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Create the slice
export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    resetTask: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMyTasks.pending, (state) => {
        state.loading = true;
        state.error = null; // Reset error state on pending
      })
      .addCase(getMyTasks.fulfilled, (state, action) => {
        state.tasks = action.payload;
        state.loading = false;
      })
      .addCase(getMyTasks.rejected, (state, action) => {
        state.error = action.payload; // Use action.payload for the error message
        state.loading = false;
      })
      .addCase(removetask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removetask.fulfilled, (state, action) => {
        // Filter out the trashed task immediately
        state.tasks = state.tasks.filter(task => task._id !== action.payload);
        state.loading = false;
      })
      .addCase(removetask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Use action.payload for the error message
      });
  },
});

export const { resetTask } = taskSlice.actions;
export default taskSlice.reducer;
