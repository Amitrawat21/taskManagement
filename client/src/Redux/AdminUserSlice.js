import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  adminAllUsers: [],
  loading: false,
  error: null,
  adminAllTask: []
};

export const getMyUsers = createAsyncThunk(
  'admin/getMyUsers',
  async ({ userId, adminId }, thunkAPI) => {
    try {
      
      const response = await axios.put(`http://localhost:8000/user/addUser/${adminId}`, { userId });
      return response.data.allUser; // Ensure this is the correct path to the users array in your response
    } catch (error) {
      console.error('Error fetching users:', error);
      const message = error.response && error.response.data && error.response.data.message
        ? error.response.data.message
        : error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const getUser = createAsyncThunk(
    'admin/getUser',
    async ({  adminId }, thunkAPI) => {
      try {
         
        const response = await axios.get(`http://localhost:8000/user/adminUser/${adminId}`);
        return response.data.myUser; // Ensure this is the correct path to the users array in your response
      } catch (error) {
        console.error('Error fetching users:', error);
        const message = error.response && error.response.data && error.response.data.message
          ? error.response.data.message
          : error.message;
        return thunkAPI.rejectWithValue(message);
      }
    }
  );

  export const getAdminTask = createAsyncThunk(
    'admin/getAdminTask',
    async ({  adminId }, thunkAPI) => {
      try {
         
        const response = await axios.get(`http://localhost:8000/task/adminAllUser/${adminId}`);
        return response.data.allTasks; // Ensure this is the correct path to the users array in your response
      } catch (error) {
        console.error('Error fetching users:', error);
        const message = error.response && error.response.data && error.response.data.message
          ? error.response.data.message
          : error.message;
        return thunkAPI.rejectWithValue(message);
      }
    }
  );
  

  

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    resetAdminUser: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMyUsers.pending, (state) => {
        state.loading = true;
        state.error = null; // Reset error state on pending
      })
      .addCase(getMyUsers.rejected, (state, action) => {
        state.error = action.payload; // Use action.payload for the error message
        state.loading = false;
      })
      .addCase(getUser.pending, (state) => {
        state.loading = true;
        state.error = null; // Reset error state on pending
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.adminAllUsers = action.payload; // Use action.payload for the error message
        state.loading = false;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.error = action.payload; // Use action.payload for the error message
        state.loading = false;
      })
      .addCase(getAdminTask.pending, (state) => {
        state.loading = true;
        state.error = null; // Reset error state on pending
      })
      .addCase(getAdminTask.fulfilled, (state, action) => {
        state.adminAllTask = action.payload; // Use action.payload for the error message
        state.loading = false;
      })
      .addCase(getAdminTask.rejected, (state, action) => {
        state.error = action.payload; // Use action.payload for the error message
        state.loading = false;
      })


     
  },
});

export const { resetAdminUser } = adminSlice.actions;
export default adminSlice.reducer;
