import { useUserInputStore } from "../user.store/user.add.store";
import { useUserStore } from "../user.store/user.store";
import { useNavigateTo } from "../utils/navigate";
import { useAuthAxios } from "../utils/axios.auth";

export const userLogin = () => {
  const { email, password, resetInput } = useUserInputStore();
  const { setId, setName, setAccessToken, setRefreshToken, setIsLoggedIn } =
    useUserStore();
  const { navigateTo } = useNavigateTo();
  const { loginAxios } = useAuthAxios();

  const login = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await loginAxios({ email, password });
      resetInput();
      setId(response._id);
      setName(response.name);
      setAccessToken(response.accessToken);
      setRefreshToken(response.refreshToken);
      setIsLoggedIn(true);
      navigateTo("/");
    } catch (error) {
      console.error("Login failed:", error);
      alert("Login failed. Please check your credentials and try again.");
    }
  };
  return { login };
};
