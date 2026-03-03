import { createAsyncThunk } from '@reduxjs/toolkit';
import { httpService } from '../httpService';
import type { Application, CreateApplicationDto, UpdateApplicationStatusDto } from '~/types/application';

export const applicationService = {
  submitApplication: (dto: CreateApplicationDto) =>
    httpService.post<Application>('/applications', dto),
  getApplications: () =>
    httpService.get<Application[]>('/applications'),
  updateApplicationStatus: (id: string, dto: UpdateApplicationStatusDto) =>
    httpService.patch<Application>(`/applications/${id}/status`, dto),
};

export const submitApplication = createAsyncThunk(
  'applications/submit',
  async (dto: CreateApplicationDto, { rejectWithValue }) => {
    try {
      return await applicationService.submitApplication(dto);
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to submit application');
    }
  }
);

export const fetchApplications = createAsyncThunk(
  'applications/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      return await applicationService.getApplications();
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch applications');
    }
  }
);

export const updateApplicationStatus = createAsyncThunk(
  'applications/updateStatus',
  async ({ id, dto }: { id: string; dto: UpdateApplicationStatusDto }, { rejectWithValue }) => {
    try {
      return await applicationService.updateApplicationStatus(id, dto);
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to update status');
    }
  }
);
