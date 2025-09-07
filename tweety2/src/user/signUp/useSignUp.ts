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
    e.preventDefault()
    console.log('Logging in user with details:', {})
    signupAxios(name, email, password)
    setMessage('Sign up successful! Please log in.')
    navigateTo('/login')
  }

  return {
    signUp,
  }
}
