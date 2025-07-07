// function to handle logout click

import { useModalOpenStore } from "./modalOpen.store";
import { useSignUp } from "./signUp.store";
import { useMessageModalStore } from "../message_Modal/messageModal.store";
import { useMessagesStore } from "../newTweet/messages.store";
import { SignUpAxios } from "../../utilities/axiosHandlers/loginSignUp.axios";

export function useAuthHandler() {
  const { resetCredentials, setIsLogedIn, setUser, clearTokens } = useSignUp();
  const { setLogoutOpen, setLoginOpen, setSignUpOpen } = useModalOpenStore();
  const { clearError } = useMessagesStore();
  const { clearMessage } = useMessageModalStore();
  const { name, email, password } = useSignUp();

  function LogOutOnClick() {
    clearTokens();
    setUser("");
    setIsLogedIn(false);
    setLogoutOpen(true);
    resetCredentials();
  }

  async function LoginHandler() {
    const { login } = SignUpAxios;
    await login(email, password);
    clearError();
    clearMessage();
    resetCredentials();
    setLoginOpen(false);
  }
  async function signUpHandler() {
    const signUp = SignUpAxios.signUp;
    signUp(name, email, password);
    clearError();
    clearMessage();
    resetCredentials();
    setSignUpOpen(false);
  }

  return { LogOutOnClick, LoginHandler, signUpHandler };
}
