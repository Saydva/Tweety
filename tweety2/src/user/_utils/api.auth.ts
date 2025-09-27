import { Api } from '@/api/generated/api'
import { useAuthStore } from '../_store/auth.store'

export const useAuthApi = () => {
  const { accessToken } = useAuthStore()
  const api = new Api({ baseUrl: 'http://localhost:4000' })

  const signup = async (name: string, email: string, password: string) => {
    try {
      const response = await api.auth.authControllerSignUp(
        { name, email, password },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      )
      return response
    } catch (error: Error | any) {
      throw error
    }
  }

  const login = async (email: string, password: string) => {
    try {
      const response = await api.auth.authControllerLogin({ email, password })
      return response
    } catch (error) {
      throw error
    }
  }

  const logout = async (userId: string) => {
    try {
      const response = await api.auth.authControllerLogout(
        { userId },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      )
      return response
    } catch (error) {
      return error
    }
  }

  return {
    signup,
    login,
    logout,
  }
}
