import { useAuthAxios } from '@/user/utils/axios.auth'
import { useNavigateTo } from '@/user/utils/navigate'
import { useUserStore } from '../userStore/user.store'

export const useSignUp = () => {
  const { navigateTo } = useNavigateTo()
  const { signupAxios } = useAuthAxios()
  const { setMessage } = useUserStore()

  const signUp = (
    e: React.FormEvent,
    name: string,
    email: string,
    password: string
  ) => {
    e.preventDefault() // Prevent default form submission
    console.log('Logging in user with details:', {})
    // Here you would typically call an API to log in the user
    signupAxios(name, email, password)
    setMessage('Sign up successful! Please log in.')
    navigateTo('/login') // Navigate to home page after successful login
  }

  return {
    signUp,
  }
}
