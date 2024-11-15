"use client"
import { createSlice } from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode';

const initialState = {
  token: typeof window !== 'undefined' ? localStorage.getItem('token') : null,
  token: typeof window !== 'undefined' ? localStorage.getItem('user') : null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      if (typeof window !== 'undefined') {
        localStorage.setItem('user', action.payload);
      }
      },
    setToken: (state, action) => {
      state.token = action.payload;
      if (typeof window !== 'undefined') {
        localStorage.setItem('token', action.payload);
      }
    },
    clearAuth: (state) => {
      state.user = null;
      state.token = null;
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    },

    checkTokenExpiry: (state, action) => {
      if (state.token) {
        try {
          const decodedToken = jwtDecode(state.token);
          const currentTime = Date.now() / 1000;
          if (decodedToken.exp < currentTime) {
            state.token = null;
            state.user = null;
            if (typeof window !== 'undefined') {
              localStorage.removeItem('token');
              localStorage.removeItem('user');
            }
          }
        } catch (error) {
          console.error('Invalid token:', error);
          state.token = null;
          state.user = null;
          if (typeof window !== 'undefined') {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
          }
        }
      }
    },
  },
});

export const { setToken,setUser, clearAuth, checkTokenExpiry } = authSlice.actions;
export const selectAuth = (state)=>state.auth;
export default authSlice.reducer;
