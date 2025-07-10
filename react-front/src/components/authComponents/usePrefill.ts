import { useInputStore } from "../../stores/auth/input.store";

export const usePrefill = () => {
  const { setEmail, setPassword, setName } = useInputStore();

  const prefillLogin = () => {
    setEmail("test@gmail.com");
    setPassword("Test1234");
  };

  const prefillSignUp = () => {
    setName("Test User");
    setEmail("test@gmail.com");
    setPassword("Test1234");
  };

  return { prefillLogin, prefillSignUp };
};
