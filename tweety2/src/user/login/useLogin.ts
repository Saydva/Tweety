import { useUserStore } from '@/user/_store/user.store'
import { useAuthStore } from '../_store/auth.store'
import { useNavigateTo } from '@/user/_utils/navigate'
import { useAuthAxios } from '@/user/_utils/axios.auth'

export const useLogin = () => {
  const { setId, setName, setIsLoggedIn, setMessage } = useUserStore()
  const { setTokens } = useAuthStore()
  const { navigateTo } = useNavigateTo()
  const { login } = useAuthAxios()

  const loginHandler = async (
    e: React.FormEvent<HTMLFormElement>,
    email: string,
    password: string
  ) => {
    e.preventDefault()

    try {
      const response = await login(email, password)
      setTokens(response.tokens.accessToken, response.tokens.refreshToken)
      setId(response._id)
      setName(response.name)
      setIsLoggedIn(true)
      setMessage('Login successful!')
      navigateTo('/')
    } catch (error) {
      console.error('Login failed:', error)
      alert('Login failed. Please check your credentials and try again.')
      setIsLoggedIn(false)
    }
  }
  return { loginHandler }
}
