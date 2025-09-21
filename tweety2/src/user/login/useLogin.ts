import { useUserStore } from '@/user/_store/user.store'
import { useAuthStore } from '../_store/auth.store'
import { useNavigateTo } from '@/user/_utils/navigate'
import { useAuthApi } from '@/user/_utils/api.auth'

export const useLogin = () => {
  const { setId, setName, setIsLoggedIn, setMessage } = useUserStore()
  const { setTokens } = useAuthStore()
  const { navigateTo } = useNavigateTo()
  const { login } = useAuthApi()

  type LoginResponse = {
    tokens: { accessToken: string; refreshToken: string }
    _id: string
    name: string
  }

  const loginHandler = async (
    e: React.FormEvent<HTMLFormElement>,
    email: string,
    password: string
  ) => {
    e.preventDefault()
    try {
      const response = (await login(email, password)) as LoginResponse
      setIsLoggedIn(true)
      setMessage('Login successful!')
      setId(response._id)
      setName(response.name)
      setTokens(response.tokens.accessToken, response.tokens.refreshToken)
      navigateTo('/')
    } catch (error) {
      console.error('Login failed:', error)
      alert('Login failed. Please check your credentials and try again.')
      setIsLoggedIn(false)
    }
  }
  return { loginHandler }
}
