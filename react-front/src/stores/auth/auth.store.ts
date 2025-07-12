import { create } from "zustand";

type AuthProps = {
  user: string | null;
  id: string | null;
  refreshToken: string | null;
  accessToken: string | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
};

type AuthActions = {
  setUser: (user: string | null) => void;
  setId: (id: string | null) => void;
  setRefreshToken: (token: string | null) => void;
  setAccessToken: (token: string | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearAuth: () => void;
};

export const useAuthStore = create<AuthProps & AuthActions>((set) => ({
  user: null,
  id: null,
  refreshToken: null,
  accessToken: null,
  loading: false,
  error: null,
  isAuthenticated: false,

  setUser: (user) => set({ user, error: null }),
  setId: (id) => set({ id }),
  setRefreshToken: (refreshToken) =>
    set({ refreshToken: refreshToken, isAuthenticated: !!refreshToken }),
  setAccessToken: (accessToken) =>
    set({ accessToken, isAuthenticated: !!accessToken, error: null }),
  clearAuth: () =>
    set({
      user: null,
      refreshToken: null,
      accessToken: null,
      loading: false,
      error: null,
      isAuthenticated: false,
    }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
}));
