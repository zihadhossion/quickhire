import { createSlice } from '@reduxjs/toolkit';
import type { UserVerifyState } from '~/types/user-verify';
import { userTokenVerify } from '~/services/httpServices/userHttpService';

const initialState: UserVerifyState = {
  isAuthenticated: false,
  userVerifyData: null,
  success: false,
  error: null,
};

const userVerifySlice = createSlice({
  name: 'userVerify',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(userTokenVerify.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.userVerifyData = action.payload;
        state.success = true;
        state.error = null;
      })
      .addCase(userTokenVerify.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.userVerifyData = null;
        state.success = false;
        state.error = action.payload;
      });
  },
});

export default userVerifySlice.reducer;
