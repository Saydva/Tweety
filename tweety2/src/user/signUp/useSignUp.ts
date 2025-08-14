import { useUserInputStore } from '../userStore/user.add.store';
import { useAuthAxios } from '../utils/axios.auth';
import { useNavigateTo } from '../utils/navigate';

export const useSignUp = () => {
  const { name, email, password, resetInput } = useUserInputStore();
  const { navigateTo } = useNavigateTo();
  const { signupAxios } = useAuthAxios();

  const signUp = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission
    console.log('Logging in user with details:', { name, email, password });
    // Here you would typically call an API to log in the user
    signupAxios({
      name,
      email,
      password,
    });
    resetInput(); // Reset input fields after login
    navigateTo('/login'); // Navigate to home page after successful login
  };

  return {
    signUp,
  };
};
