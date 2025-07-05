// function to handle logout click

import { useModalOpenStore } from "../components/authorization/modalOpen.store";
import { useSignUp } from "../components/authorization/signUp.store";

// it resets the credentials, clears tokens, sets user to empty string,
function LogOutOnClick() {
  useSignUp.getState().clearTokens;
  useSignUp.getState().setUser("");
  useSignUp.getState().setIsLogedIn(false);
  useModalOpenStore.getState().setLogoutOpen(true);
  useSignUp.getState().resetCredentials();
}

type HandlerFunctions = {
  LogOutOnClick: () => void;
};

export const useHandlerFunctions: HandlerFunctions = {
  LogOutOnClick: () => {
    LogOutOnClick();
  },
};
