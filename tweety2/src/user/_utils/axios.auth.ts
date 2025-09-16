import { axiosInstance } from '@/utils/axios'
import { useAuthStore } from '../_store/auth.store'

export const useAuthAxios = () => {
  const { accessToken } = useAuthStore()

  const signup = async (name: string, email: string, password: string) => {
    try {
      const response = await axiosInstance(accessToken ?? undefined).post(
        'auth/signup',
        {
          name,
          email,
          password,
        }
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
      const response = await axiosInstance(accessToken ?? undefined).post(
        'auth/login',
        { email, password }
      )
      return response.data
    } catch (error) {
      console.error('Error during login:', error)
      throw error
    }
  }

  const getUserInfo = async () => {
    try {
      const response = await axiosInstance(accessToken ?? undefined).get(
        'auth/user/me'
      )
      return response.data
    } catch (error) {
      console.error('Error fetching user info:', error)
      throw error
    }
  }

  const logout = async (userId: string) => {
    try {
      const response = await axiosInstance(accessToken ?? undefined).post(
        'auth/logout',
        { userId }
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
