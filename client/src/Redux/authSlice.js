import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user: JSON.parse(localStorage.getItem('user')) || null,
    token: localStorage.getItem('token') || null,
    isSidebarOpen: false,
  }

  export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
      login: (state, action) => {
        state.user = action.payload.user
        state.token = action.payload.token
        // Save to localStorage
        localStorage.setItem('user', JSON.stringify(state.user))
        localStorage.setItem('token', state.token)
      },
      register: (state, action) => {
        state.user = action.payload.user
        state.token = action.payload.token
        // Save to localStorage
        localStorage.setItem('user', JSON.stringify(state.user))
        localStorage.setItem('token', state.token)
      },
      logout: (state, action) => {
        state.user = null
        state.token = null
        // Clear from localStorage
        localStorage.removeItem('user')
        localStorage.removeItem('token')
      },

      setOpenSidebar: (state, action) => {
        state.isSidebarOpen = action.payload;
      },
    }
  })
  
  export const { login, register, logout , setOpenSidebar } = authSlice.actions
  export default authSlice.reducer
  
  