import { AuthApi } from '@/api'
import { useAuthStore } from '../_store/auth.store'

export const useAuthApi = () => {
  const { accessToken } = useAuthStore()
  const api = new AuthApi(undefined, 'http://localhost:4000')

  const signup = async (name: string, email: string, password: string) => {
    try {
      const response = await api.authControllerSignUp(
        {
          name,
          email,
          password,
        },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      )

      return response.data
    } catch (error: Error | any) {
      console.error('Error during registration:', error)
      alert(
        'Registration failed. Please try again.' +
          ' ' +
          error.response?.data?.message
      )
      throw error
    }
  }

  const login = async (email: string, password: string) => {
    try {
      const response = await api.authControllerLogin({
        email,
        password,
      })
      return response.data
    } catch (error) {
      console.error('Error during login:', error)
      throw error
    }
  }

  const getUserInfo = async () => {
    try {
      const response = await api.authControllerGetMe(`Bearer ${accessToken}`)
      return response.data
    } catch (error) {
      console.error('Error fetching user info:', error)
      throw error
    }
  }

  const logout = async (userId: string) => {
    try {
      const response = await api.authControllerLogout(
        { userId },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      )
      return response.data
    } catch (error) {
      console.error('Error during logout:', error)
      throw error
    }
  }

  return {
    signup,
    login,
    getUserInfo,
    logout,
  }
}
