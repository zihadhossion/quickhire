export interface User {
  id: string;
  email: string;
  name: string;
  fullName?: string;
  role: number;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface RegisterDto {
  name: string;
  email: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  accessToken?: string;
}
