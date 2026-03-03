import { createSlice } from '@reduxjs/toolkit';
import type { ApplicationState } from '~/types/application';
import {
  submitApplication,
  fetchApplications,
  updateApplicationStatus,
} from '~/services/httpServices/applicationService';

const initialState: ApplicationState = {
  applications: [],
  submittedApplication: null,
  loading: false,
  error: null,
};

const applicationSlice = createSlice({
  name: 'applications',
  initialState,
  reducers: {
    clearApplicationError: (state) => {
      state.error = null;
    },
    clearSubmittedApplication: (state) => {
      state.submittedApplication = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitApplication.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitApplication.fulfilled, (state, action) => {
        state.loading = false;
        state.submittedApplication = action.payload;
      })
      .addCase(submitApplication.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchApplications.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchApplications.fulfilled, (state, action) => {
        state.loading = false;
        state.applications = action.payload;
      })
      .addCase(fetchApplications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateApplicationStatus.fulfilled, (state, action) => {
        const idx = state.applications.findIndex(
          (a) => a.id === action.payload.id
        );
        if (idx !== -1) state.applications[idx] = action.payload;
      });
  },
});

export const { clearApplicationError, clearSubmittedApplication } =
  applicationSlice.actions;
export default applicationSlice.reducer;
