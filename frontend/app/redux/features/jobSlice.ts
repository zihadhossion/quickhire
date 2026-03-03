import { createSlice } from "@reduxjs/toolkit";
import type { JobState } from "~/types/job";
import {
  fetchJobs,
  fetchJobById,
  createJob,
  updateJob,
  deleteJob,
} from "~/services/httpServices/jobService";

const initialState: JobState = {
  jobs: [],
  selectedJob: null,
  loading: false,
  error: null,
  total: 0,
  page: 1,
  limit: 10,
};

const jobSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    clearSelectedJob: (state) => {
      state.selectedJob = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.loading = false;
        state.jobs = action.payload.data;
        state.total = action.payload.total;
        state.page = action.payload.page;
        state.limit = action.payload.limit;
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchJobById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchJobById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedJob = action.payload;
      })
      .addCase(fetchJobById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createJob.fulfilled, (state, action) => {
        state.jobs.unshift(action.payload);
        state.total += 1;
      })
      .addCase(updateJob.fulfilled, (state, action) => {
        const idx = state.jobs.findIndex((j) => j.id === action.payload.id);
        if (idx !== -1) state.jobs[idx] = action.payload;
        if (state.selectedJob?.id === action.payload.id)
          state.selectedJob = action.payload;
      })
      .addCase(deleteJob.fulfilled, (state, action) => {
        state.jobs = state.jobs.filter((j) => j.id !== action.payload);
        state.total -= 1;
      });
  },
});

export const { clearSelectedJob } = jobSlice.actions;
export default jobSlice.reducer;
