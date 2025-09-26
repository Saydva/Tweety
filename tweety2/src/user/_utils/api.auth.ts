import { Api } from '@/api/generated/api'
import { useAuthStore } from '../_store/auth.store'

export const useAuthApi = () => {
  const { accessToken } = useAuthStore()
  const api = new Api({ baseUrl: 'http://localhost:4000' })

  const signup = async (name: string, email: string, password: string) => {
    try {
      // Use the correct signup/register endpoint and DTO
      const response = await api.auth.authControllerSignUp(
        { name, email, password },
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
      const response = await api.auth.authControllerLogin({ email, password })
      return response.data
    } catch (error) {
      console.error('Error during login:', error)
      throw error
    }
  }

  const logout = async (userId: string) => {
    try {
      const response = await api.auth.authControllerLogout(
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
    logout,
  }
}
