import { useInputStore } from "../../stores/auth/input.store";

export const loginPrefill = () => {
  const { setEmail, setPassword } = useInputStore.getState();
  setEmail("test@gmail.com");
  setPassword("Test1234");
};

export const signUpPrefill = () => {
  const { setName, setEmail, setPassword } = useInputStore.getState();
  setName("Test User");
  setEmail("test@gmail.com");
  setPassword("Test1234");
};
