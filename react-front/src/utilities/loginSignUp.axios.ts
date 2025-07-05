import axios from "axios";
import { useSignUp } from "../components/authorization/signUp.store";
import { useMessageModalStore } from "../components/message_Modal/messageModal.store";
import { useAxios } from "./axios";

const PORT = import.meta.env.VITE_PORT || 3000; // Default to 5000 if not set

//developer login axios actions
// This file contains the axios functions for sign up and login
const devSignUp = async (
  name: string = "Dev",
  email: string = "dev@gmail.com",
  password: string = "Dev12345"
) => {
  await axios
    .post(`http://localhost:${PORT}/auth/signup`, {
      name: name,
      email: email,
      password: password,
    })
    .finally(() => {
      devLogin(email, password);
    });
};

const devLogin = async (
  email: string = "dev@gmail.com",
  password: string = "Dev12345"
) => {
  const response = await axios.post(`http://localhost:${PORT}/auth/login`, {
    email: email,
    password: password,
  });
  const { refreshToken, accessToken } = response.data.tokens;
  const name = response.data.name;
  useSignUp.getState().setUser(name + " :");
  useSignUp.getState().setEmail(email);
  useSignUp.getState().setIsLogedIn(true);
  useSignUp.getState().setAccessToken(accessToken);
  useSignUp.getState().setRefreshToken(refreshToken);
  useMessageModalStore.getState().setMessage("Login successful");
  useAxios.getTweets();
};

const signUp = async (name: string, email: string, password: string) => {
  try {
    await axios.post(`http://localhost:${PORT}/auth/signup`, {
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
    const response = await axios.post(`http://localhost:${PORT}/auth/login`, {
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
    useAxios.getTweets();
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

const refreshToken = async (token: string) => {
  try {
    const response = await axios.post(`http://localhost:${PORT}/auth/refresh`, {
      Headers: { Authorization: `Bearer ${token}` },
    });
    const { refreshToken, accessToken } = response.data.tokens;
    useSignUp.getState().setAccessToken(accessToken);
    useSignUp.getState().setRefreshToken(refreshToken);
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error during token refresh:", error.message);
    }
  }
};

export const SignUpAxios = {
  // Developer login methods
  devSignUpLogin: () => {
    devSignUp();
  },
  signUp: (name: string, email: string, password: string) => {
    signUp(name, email, password);
  },
  login: (email: string, password: string) => {
    login(email, password).then(() => {
      // After login, fetch tweets to update the state
      useAxios.getTweets();
    });
  },
  refreshToken: (refreshTokenStr: string): Promise<any> => {
    return refreshToken(refreshTokenStr);
  },
};
// You can add more methods here for login, etc.
