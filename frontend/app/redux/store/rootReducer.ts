import { combineReducers } from '@reduxjs/toolkit';
import jobReducer from '~/redux/features/jobSlice';
import applicationReducer from '~/redux/features/applicationSlice';
import authReducer from '~/redux/features/authSlice';
import userVerifyReducer from '~/redux/features/userVerifySlice';

const rootReducer = combineReducers({
  jobs: jobReducer,
  applications: applicationReducer,
  auth: authReducer,
  userVerify: userVerifyReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
