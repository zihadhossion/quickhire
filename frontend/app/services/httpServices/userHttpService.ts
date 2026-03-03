import { createAsyncThunk } from '@reduxjs/toolkit';
import { httpService } from '../httpService';

interface IJwtPayload {
  id: string;
  fullName: string;
  email: string;
  role: string;
  image?: string | null;
  isActive?: boolean;
}

export const userTokenVerify = createAsyncThunk(
  'userVerify/tokenVerify',
  async (_, { rejectWithValue }) => {
    try {
      const result = await httpService.get<IJwtPayload>('/auth/check-login');
      return { data: result };
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);
