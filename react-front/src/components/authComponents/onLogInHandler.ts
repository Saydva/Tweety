import { useAuthStore } from "../../stores/auth/auth.store";
import { useInputStore } from "../../stores/auth/input.store";
import { validationRegex } from "../../utilities/validation/regex";
import { useAuthActions } from "../../utilities/auth/useAuth.actions";

export const useLogInHandler = () => {
  const { setEmail, setPassword, email, password } = useInputStore();
  const { loginUser } = useAuthActions();
  const { loading } = useAuthStore();
  const isEmailValid = validationRegex.email(email);
  const isPasswordValid = validationRegex.password(password);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isEmailValid || !isPasswordValid) return;
    try {
      await loginUser({ email, password });
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return {
    handleLogin,
    setEmail,
    setPassword,
    email,
    password,
    loading,
    isEmailValid,
    isPasswordValid,
  };
};
