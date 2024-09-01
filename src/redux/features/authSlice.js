import { createSlice } from '@reduxjs/toolkit';
import { registerUser, signInUser, sendPasswordResetEmail, updateUserPassword } from './authThunk';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoading: false,
    error: null,
    success: false,
    user: null,
    isAuthenticated: false,
    resetLinkSent: false,
  },
  reducers: {
    resetState(state) {
      state.isLoading = false;
      state.error = null;
      state.success = false;
    },
    logout(state) {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.success = false;
        state.isAuthenticated = false;

      })
      .addCase(registerUser.fulfilled, (state) => {
        state.isLoading = false;
        state.success = true;
        state.error = null;
        state.isAuthenticated = true;

      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.success = false;
        state.error = action.payload;
        state.isAuthenticated = false;

      })
      .addCase(signInUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.success = false;
        state.isAuthenticated = false;
      })
      .addCase(signInUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
        state.isAuthenticated = true;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(signInUser.rejected, (state, action) => {
        state.isLoading = false;
        state.success = false;
        state.isAuthenticated = false;
        state.error = action.payload;
      })
      .addCase(sendPasswordResetEmail.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.success = false;
        state.resetLinkSent = false;
      })
      .addCase(sendPasswordResetEmail.fulfilled, (state) => {
        state.isLoading = false;
        state.success = true;
        state.resetLinkSent = true;
        state.error = null;
      })
      .addCase(sendPasswordResetEmail.rejected, (state, action) => {
        state.isLoading = false;
        state.success = false;
        state.resetLinkSent = false;
        state.error = action.payload;
      })
      .addCase(updateUserPassword.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateUserPassword.fulfilled, (state) => {
        state.isLoading = false;
        state.success = true;
        state.error = null;
      })
      .addCase(updateUserPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.success = false;
        state.error = action.payload;
      });
  },
});

export const { resetState, logout } = authSlice.actions;

// Selector to check if user is authenticated
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;

export default authSlice.reducer;
