import { createAsyncThunk } from '@reduxjs/toolkit';
import { httpService } from '../httpService';
import type { User, LoginDto, RegisterDto, LoginResponse } from '~/types/auth';

export const authService = {
  login: (dto: LoginDto) =>
    httpService.post<LoginResponse>('/auth/login', dto),
  register: (dto: RegisterDto) =>
    httpService.post<LoginResponse>('/auth/register', dto),
  logout: () =>
    httpService.get<void>('/auth/logout'),
  getCurrentUser: () =>
    httpService.get<User>('/auth/me'),
};

export const loginUser = createAsyncThunk(
  'auth/login',
  async (dto: LoginDto, { rejectWithValue }) => {
    try {
      return await authService.login(dto);
    } catch (error: any) {
      return rejectWithValue(error.message || 'Login failed');
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/register',
  async (dto: RegisterDto, { rejectWithValue }) => {
    try {
      return await authService.register(dto);
    } catch (error: any) {
      return rejectWithValue(error.message || 'Registration failed');
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await authService.logout();
    } catch (error: any) {
      return rejectWithValue(error.message || 'Logout failed');
    }
  }
);

export const fetchCurrentUser = createAsyncThunk(
  'auth/me',
  async (_, { rejectWithValue }) => {
    try {
      return await authService.getCurrentUser();
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch user');
    }
  }
);
