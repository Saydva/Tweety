import { authAPI } from "./auth.methods";
import { useAuthStore } from "../../stores/auth/auth.store";
import { useNavigate } from "react-router";
import { useInputStore } from "../../stores/auth/input.store";

type LoginProps = {
  email: string;
  password: string;
};

type SignupProps = {
  name: string;
  email: string;
  password: string;
};

export const useAuthActions = () => {
  const navigate = useNavigate();
  const { setUser, setAccessToken, setLoading, setRefreshToken, setError } =
    useAuthStore();
  const { clearInputs } = useInputStore();

  const loginUser = async (data: LoginProps) => {
    try {
      setLoading(true);
      const response = await authAPI.login(data);
      setUser(response.name);
      setAccessToken(response.tokens.accessToken);
      setRefreshToken(response.tokens.refreshToken);
      clearInputs();
      navigate("/");
      return response;
    } catch (error: any) {
      setError(error.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const signupUser = async (data: SignupProps) => {
    try {
      setLoading(true);
      setError(null);
      await authAPI.signup(data);
      clearInputs();
      navigate("/login");
    } catch (error: any) {
      setError(error.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  const logoutUser = async () => {
    const { clearAuth, setLoading, setError } = useAuthStore.getState();
    try {
      clearAuth();
    } catch (error: any) {
      setError(error.message || "Logout failed");
    } finally {
      setLoading(false);
    }
  };

  const refreshToken = async () => {
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
      clearAuth();
      setError(error.message || "Session expired");
    } finally {
      setLoading(false);
    }
  };
  return {
    loginUser,
    signupUser,
    logoutUser,
    refreshToken,
  };
};
