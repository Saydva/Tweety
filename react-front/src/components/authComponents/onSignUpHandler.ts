import { useAuthActions } from "../../utilities/auth/useAuth.actions";
import { validationRegex } from "../../utilities/validation/regex";
import { useInputStore } from "../../stores/auth/input.store";
import { useAuthStore } from "../../stores/auth/auth.store";

export const useSignUpHandler = () => {
  const { name, email, password, setName, setEmail, setPassword } =
    useInputStore();
  const { signupUser } = useAuthActions();
  const { loading } = useAuthStore();
  const isEmailValid = validationRegex.email(email);
  const isPasswordValid = validationRegex.password(password);

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (name.trim() && isEmailValid && isPasswordValid) {
      try {
        await signupUser({
          name,
          email,
          password,
        });
      } catch (error) {
        console.error("Signup failed:", error);
      }
    } else {
      console.error("Invalid input");
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
    setName,
    setEmail,
    setPassword,
  };
};
