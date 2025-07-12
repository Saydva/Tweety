import { useInputStore } from "../../stores/auth/input.store";
import { validationRegex } from "../../utilities/validation/regex";
import { authAPI } from "../../utilities/auth/auth.methods";
import { useAuthStore } from "../../stores/auth/auth.store";
import { useNavigate } from "react-router";

export const useLogInHandler = () => {
  const { email, password, setEmail, setPassword } = useInputStore();
  const {
    error,
    loading,
    setUser,
    setId,
    setAccessToken,
    setRefreshToken,
    setLoading,
    setError,
  } = useAuthStore();
  const navigate = useNavigate();

  const isEmailValid = validationRegex.email(email);
  const isPasswordValid = validationRegex.password(password);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isEmailValid || !isPasswordValid) return;

    try {
      setLoading(true);
      setError(null);

      const response = await authAPI.login({ email, password });

      setUser(response.name);
      setId(response._id);
      setAccessToken(response.tokens.accessToken);
      setRefreshToken(response.tokens.refreshToken);

      navigate("/");
    } catch (error: any) {
      setError(error.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return {
    handleLogin,
    setEmail,
    setPassword,
    email,
    password,
    isEmailValid,
    isPasswordValid,
    loading,
    error,
  };
};
