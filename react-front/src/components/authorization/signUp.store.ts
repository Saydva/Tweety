import { create } from "zustand";

type AuthStoreProps = {
  name: string;
  email: string;
  user: string;
  password: string;
  isLoged: boolean;
  accessToken: string | undefined;
  refreshToken: string | undefined;
};

type AuthStoreActions = {
  setName: (name: string) => void;
  setEmail: (email: string) => void;
  setUser: (user: string) => void;
  setPassword: (password: string) => void;
  setIsLogedIn: (isLoged: boolean) => void;
  setAccessToken: (accessToken: string) => void;
  setRefreshToken: (token: string) => void;

  resetCredentials: () => void;
  clearTokens: () => void;
};

export const useSignUp = create<AuthStoreProps & AuthStoreActions>((set) => ({
  name: "",
  email: "",
  password: "",
  user: "",
  isLoged: false,
  accessToken: undefined,
  refreshToken: undefined,
  setName: (name: string) => set(() => ({ name })),
  setEmail: (email: string) => set(() => ({ email })),
  setUser: (user: string) => set(() => ({ user: user })),
  setPassword: (password: string) => set(() => ({ password })),
  setIsLogedIn: (isLoged: boolean) => set({ isLoged: isLoged }),
  setAccessToken: (accessToken: string) => set(() => ({ accessToken })),
  setRefreshToken: (refreshToken: string) => set(() => ({ refreshToken })),
  resetCredentials: () =>
    set(() => ({
      name: "",
      email: "",
      password: "",
    })),
  clearTokens: () =>
    set(() => ({
      accessToken: undefined,
      refreshToken: undefined,
    })),
}));
