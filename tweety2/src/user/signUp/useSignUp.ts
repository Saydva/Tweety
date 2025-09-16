import { useAuthAxios } from '@/user/_utils/axios.auth'
import { useUserStore } from '../_store/user.store'
import { useNavigateTo } from '@/user/_utils/navigate'

export const useSignUp = () => {
  const { signup } = useAuthAxios()
  const { setMessage } = useUserStore()
  const { navigateTo } = useNavigateTo()

  const signUpHandler = async (
    e: React.FormEvent,
    name: string,
    email: string,
    password: string
  ) => {
    try {
      e.preventDefault()
      await signup(name, email, password)
      setMessage('Sign up successful! Please log in.')
      navigateTo('/login')
    } catch (error) {
      console.error('Sign up failed:', error)
      setMessage('Sign up failed. Please try again.')
    }
  }

  return {
    signUpHandler,
  }
}
