import { authAPI } from "./auth.methods";
import { useAuthStore } from "../../stores/auth/auth.store";

type LoginProps = {
  email: string;
  password: string;
};

type SignupProps = {
  name: string;
  email: string;
  password: string;
};

export const authActions = {
  loginUser: async (data: LoginProps) => {
    const { setUser, setAccessToken, setRefreshToken, setLoading, setError } =
      useAuthStore.getState();
    try {
      setLoading(true);
      setError(null); // Clear previous errors
      const response = await authAPI.login(data);
      setUser(response.name);
      setAccessToken(response.tokens.accessToken);
      setRefreshToken(response.tokens.refreshToken);

      return response;
    } catch (error: any) {
      setError(error.message || "Login failed");
    } finally {
      setLoading(false);
    }
  },
  signupUser: async (data: SignupProps) => {
    const { setUser, setLoading, setError } = useAuthStore.getState();
    try {
      setLoading(true);
      setError(null); // Clear previous errors
      const response = await authAPI.signup(data);
      setUser(response.user);
    } catch (error: any) {
      setError(error.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  },
  logoutUser: () => {
    const { clearAuth } = useAuthStore.getState();
    clearAuth();
  },
  refreshToken: async () => {
    const {
      refreshToken,
      setAccessToken,
      setRefreshToken,
      setLoading,
      setError,
      clearAuth,
    } = useAuthStore.getState();

    if (!refreshToken) {
      setError("No refresh token available");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const response = await authAPI.refresh(refreshToken);
      setAccessToken(response.accessToken);
      setRefreshToken(response.refreshToken);
    } catch (error: any) {
      // Token expired, logout user
      clearAuth();
      setError(error.message || "Session expired");
    } finally {
      setLoading(false);
    }
  },
};
