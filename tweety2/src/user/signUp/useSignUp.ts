import { useAuthAxios } from '@/user/_utils/axios.auth'
import { useUserStore } from '../_store/user.store'

export const useSignUp = () => {
  const { signup } = useAuthAxios()
  const { setMessage } = useUserStore()

  const signUpHandler = (
    e: React.FormEvent,
    name: string,
    email: string,
    password: string
  ) => {
    e.preventDefault()
    signup(name, email, password)
    setMessage('Sign up successful! Please log in.')
  }

  return {
    signUpHandler,
  }
}
