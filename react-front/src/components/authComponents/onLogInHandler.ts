import { useAuthStore } from "../../stores/auth/auth.store";
import { useInputStore } from "../../stores/auth/input.store";
import { validationRegex } from "../../utilities/validation/regex";
import { authActions } from "../../utilities/auth/auth.actions";

export const useLogInHandler = () => {
  const { setEmail, setPassword, email, password, clearInputs } =
    useInputStore();
  const { loading } = useAuthStore();
  const isEmailValid = validationRegex.email(email);
  const isPasswordValid = validationRegex.password(password);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isEmailValid || !isPasswordValid) return;
    try {
      await authActions.loginUser({ email, password });
      clearInputs(); // Clear input fields after successful login
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return {
    handleSubmit,
    setEmail,
    setPassword,
    email,
    password,
    loading,
    isEmailValid,
    isPasswordValid,
  };
};
