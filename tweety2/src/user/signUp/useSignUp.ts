import { useAuthApi } from '@/user/_utils/api.auth'
import { useUserStore } from '../_store/user.store'
import { useNavigateTo } from '@/user/_utils/navigate'

export const useSignUp = () => {
  const { signup } = useAuthApi()
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
      console.log(error)
      throw alert('Registration failed. Please try again.')
    }
  }
  return {
    signUpHandler,
  }
}
