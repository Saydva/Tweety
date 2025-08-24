import { useUserStore } from '@/user/userStore/user.store'
import { useNavigateTo } from '@/user/utils/navigate'
import { useAuthAxios } from '@/user/utils/axios.auth'

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
  const { loginAxios } = useAuthAxios()

  const login = async (
    e: React.FormEvent<HTMLFormElement>,
    email: string,
    password: string
  ) => {
    e.preventDefault()

    try {
      const response = await loginAxios(email, password)
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
  return { login }
}
