import axios from "axios";
import { useSignUp } from "../../components/authorization/signUp.store";
import { useAuthHandler } from "../../components/authorization/authHandler";

export function checkTokenValidity() {
  const accessToken = useSignUp.getState().accessToken;
  const refreshToken = useSignUp.getState().refreshToken;
  console.log(refreshToken);

  const expirationTime = accessToken
    ? JSON.parse(atob(accessToken.split(".")[1])).exp
    : null;
  console.log("Expiration Time:", expirationTime);
  const currentTime = Math.floor(Date.now() / 1000);

  if (expirationTime - 8 < currentTime) {
    if (refreshToken) {
      getRefreshToken(refreshToken);
      console.log(refreshToken);
      console.log("Token has expired, refreshing...");
    } else {
      console.error("No refresh token available to refresh access token.");
    }
  } else {
    console.log("Token is valid", expirationTime - currentTime);
  }

  // If the tokens are valid, return true
  return true;
}

const getRefreshToken = async (token: string) => {
  try {
    await axios
      .post(
        `http://localhost:${import.meta.env.VITE_PORT}/auth/refresh`,
        { refreshToken: token },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        const { accessToken, refreshToken } = response.data;
        useSignUp.getState().setAccessToken(accessToken);
        useSignUp.getState().setRefreshToken(refreshToken);
        console.log(accessToken, refreshToken);
      });
  } catch (error) {
    console.log("Error refreshing token");
    useAuthHandler().LogOutOnClick();
  }
};
