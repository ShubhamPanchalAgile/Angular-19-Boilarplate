export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
}

export const initialState: AuthState = {
  user: null,
  token: null,
  isLoading: false,
};
