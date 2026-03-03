export interface UserVerifyData {
  data: {
    id: string;
    fullName: string;
    email: string;
    role: number;
    image?: string | null;
    isActive?: boolean;
  };
}

export interface UserVerifyState {
  isAuthenticated: boolean;
  userVerifyData: UserVerifyData | null;
  success: boolean;
  error: any;
}
