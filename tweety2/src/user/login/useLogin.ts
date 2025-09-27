import { useUserStore } from '@/user/_store/user.store'
import { useAuthStore } from '../_store/auth.store'
import { useNavigateTo } from '@/user/_utils/navigate'
import { useAuthApi } from '@/user/_utils/api.auth'
import { useAuthLocalStorage } from '../_store/auth.localStorage.handler'

export const useLogin = () => {
  const { setId, setName, setIsLoggedIn, setMessage } = useUserStore()
  const { setTokens } = useAuthStore()
  const { navigateTo } = useNavigateTo()
  const { login } = useAuthApi()
  const { saveAuth } = useAuthLocalStorage()

  const loginHandler = async (
    e: React.FormEvent<HTMLFormElement>,
    email: string,
    password: string
  ) => {
    e.preventDefault()
    try {
      const response = await login(email, password)
      setIsLoggedIn(true)
      setMessage('Login successful!')
      setId(response.data.user._id)
      setName(response.data.user.name)
      setTokens(response.data.accessToken, response.data.refreshToken)
      saveAuth(
        response.data.accessToken,
        response.data.refreshToken,
        response.data.user._id,
        response.data.user.name
      )
      navigateTo('/')
    } catch (error) {
      console.error('Login failed:', error)
      alert('Login failed. Please check your credentials and try again.')
      setIsLoggedIn(false)
    }
  }
  return { loginHandler }
}
