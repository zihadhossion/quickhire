import { createAsyncThunk } from "@reduxjs/toolkit";
import { httpService } from "../httpService";
import type {
  Job,
  FetchJobsParams,
  CreateJobDto,
  UpdateJobDto,
  PaginatedJobsResponse,
} from "~/types/job";

export const jobService = {
  getJobs: (params?: FetchJobsParams) =>
    httpService.get<any>("/jobs", { params }),
  getJobById: (id: string) => httpService.get<Job>(`/jobs/${id}`),
  createJob: (dto: CreateJobDto) => httpService.post<Job>("/jobs", dto),
  updateJob: (id: string, dto: UpdateJobDto) =>
    httpService.patch<Job>(`/jobs/${id}`, dto),
  deleteJob: (id: string) => httpService.delete<void>(`/jobs/${id}`),
};

export const fetchJobs = createAsyncThunk(
  "jobs/fetchJobs",
  async (params: FetchJobsParams | undefined, { rejectWithValue }) => {
    try {
      return await jobService.getJobs(params);
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to fetch jobs");
    }
  },
);

export const fetchJobById = createAsyncThunk(
  "jobs/fetchJobById",
  async (id: string, { rejectWithValue }) => {
    try {
      return await jobService.getJobById(id);
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to fetch job");
    }
  },
);

export const createJob = createAsyncThunk(
  "jobs/createJob",
  async (dto: CreateJobDto, { rejectWithValue }) => {
    try {
      return await jobService.createJob(dto);
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to create job");
    }
  },
);

export const updateJob = createAsyncThunk(
  "jobs/updateJob",
  async (
    { id, dto }: { id: string; dto: UpdateJobDto },
    { rejectWithValue },
  ) => {
    try {
      return await jobService.updateJob(id, dto);
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to update job");
    }
  },
);

export const deleteJob = createAsyncThunk(
  "jobs/deleteJob",
  async (id: string, { rejectWithValue }) => {
    try {
      await jobService.deleteJob(id);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to delete job");
    }
  },
);
