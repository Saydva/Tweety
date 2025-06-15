import axios from "axios";
import { useSignUp } from "../components/authorization/signUp.store";
import { useMessageModalStore } from "../components/message_Modal/messageModal.store";

const signUp = async (name: string, email: string, password: string) => {
  try {
    await axios.post(`http://localhost:5000/auth/signup`, {
      name: name,
      email: email,
      password: password,
    });
    useMessageModalStore.getState().setMessage("Sign up successful");
    useMessageModalStore.getState().setError(["You can login now"]);
    useSignUp.getState().resetCredentials();
    useMessageModalStore.getState().setIsOpen(true);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      useMessageModalStore.getState().setMessage("Sign up failed");
      useMessageModalStore.getState().setIsOpen(true);
      useMessageModalStore
        .getState()
        .setError(
          error.response?.data?.message
            ? [error.response?.data?.message]
            : ["An error occurred during sign up"]
        );
    } else if (error instanceof Error) {
      useMessageModalStore.getState().setMessage("Sign up failed");
      useMessageModalStore.getState().setIsOpen(true);
      useMessageModalStore
        .getState()
        .setError(["An error occurred during sign up"]);
    }
  }
};

const login = async (email: string, password: string) => {
  try {
    const response = await axios.post(`http://localhost:5000/auth/login`, {
      email: email,
      password: password,
    });
    const { refreshToken, accessToken } = response.data.tokens;
    const name = response.data.name;
    useSignUp.getState().setUser(name + " :");
    useSignUp.getState().setIsLogedIn(true);
    useSignUp.getState().setAccessToken(accessToken);
    useSignUp.getState().setRefreshToken(refreshToken);
    useMessageModalStore.getState().setMessage("Login successful");
    useMessageModalStore.getState().setIsOpen(true);
    useSignUp.getState().resetCredentials;
  } catch (error) {
    if (error instanceof Error) {
      useMessageModalStore
        .getState()
        .setError([
          "An error occurred during login",
          "Insert right credentials",
        ]);
      useMessageModalStore.getState().setIsOpen(true);
      console.log("Error during login:");
    } else {
      useMessageModalStore.getState().setError(["Error"]);
    }
  }
};

export const SignUpAxios = {
  signUp: (name: string, email: string, password: string) => {
    signUp(name, email, password);
  },
  login: (email: string, password: string) => {
    login(email, password);
  },
};
// You can add more methods here for login, etc.
