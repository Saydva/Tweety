import { authAPI } from "../../utilities/auth/auth.methods";
import { validationRegex } from "../../utilities/validation/regex";
import { useInputStore } from "../../stores/auth/input.store";
import { useAuthStore } from "../../stores/auth/auth.store";
import { useNavigate } from "react-router";

export const useSignUpHandler = () => {
  const { name, email, password, setName, setEmail, setPassword, clearInputs } =
    useInputStore();
  const { setLoading, setError, loading, error } = useAuthStore();
  const navigate = useNavigate();

  const isEmailValid = validationRegex.email(email);
  const isPasswordValid = validationRegex.password(password);

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (name.trim() && isEmailValid && isPasswordValid) {
      try {
        setLoading(true);
        setError(null);
        await authAPI.signup({ name, email, password });
        clearInputs();
        navigate("/login");
      } catch (error: any) {
        setError(error.message || "Signup failed");
      } finally {
        setLoading(false);
      }
    }
  };

  return {
    handleSignUp,
    name,
    email,
    password,
    isEmailValid,
    isPasswordValid,
    loading,
    error,
    setName,
    setEmail,
    setPassword,
  };
};
