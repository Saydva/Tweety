import { useUserStore } from '@/user/_store/user.store'
import { useNavigateTo } from '@/user/_utils/navigate'
import { useAuthAxios } from '@/user/_utils/axios.auth'

export const useLogin = () => {
  const {
    setId,
    setName,
    setAccessToken,
    setRefreshToken,
    setIsLoggedIn,
    setMessage,
  } = useUserStore()
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
      setId(response._id)
      setName(response.name)
      setAccessToken(response.tokens.accessToken)
      setRefreshToken(response.tokens.refreshToken)
      setIsLoggedIn(true)
      navigateTo('/')
      setMessage('Login successful!')
    } catch (error) {
      console.error('Login failed:', error)
      alert('Login failed. Please check your credentials and try again.')
    }
  }
  return { loginHandler }
}
