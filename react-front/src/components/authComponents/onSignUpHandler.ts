// hooks/useSignUpHandler.ts
import { useCallback } from "react";
import type { FormEventHandler } from "react";
import { authActions } from "../../utilities/auth/auth.actions";
import { validationRegex } from "../../utilities/validation/regex";
import { useInputStore } from "../../stores/auth/input.store";
import { useAuthStore } from "../../stores/auth/auth.store";

export const useSignUpHandler = () => {
  const { name, email, password, clearInputs } = useInputStore();
  const { setError } = useAuthStore();
  const isEmailValid = validationRegex.email(email);
  const isPasswordValid = validationRegex.password(password);

  const handleSignUp: FormEventHandler<HTMLFormElement> = useCallback(
    async (e) => {
      e.preventDefault();

      if (name.trim() && isEmailValid && isPasswordValid) {
        try {
          await authActions.signupUser({
            name,
            email,
            password,
          });
          clearInputs();
        } catch (error) {
          setError("Signup failed. Please try again.");
          console.error("Signup failed:", error);
        }
      } else {
        console.error("Invalid input");
        setError("Please fill in all fields correctly.");
      }
    },
    [
      name,
      email,
      password,
      isEmailValid,
      isPasswordValid,
      clearInputs,
      setError,
    ]
  );

  return handleSignUp;
};
