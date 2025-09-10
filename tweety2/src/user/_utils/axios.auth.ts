import axios from 'axios'
import { useNavigateTo } from './navigate'
import { useAuthStore } from '../_store/auth.store'

export const useAuthAxios = () => {
  const { accessToken } = useAuthStore()

  const authAxios = () => {
    return axios.create({
      baseURL: 'http://localhost:4000/auth/',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
        ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
      },
    })
  }

  const signup = async (name: string, email: string, password: string) => {
    try {
      const response = await authAxios().post('signup', {
        name,
        email,
        password,
      })

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
      const response = await authAxios().post('login', { email, password })
      return response.data
    } catch (error) {
      console.error('Error during login:', error)
      throw error
    }
  }

  const getUserInfo = async () => {
    try {
      const response = await authAxios().get('user/me')
      return response.data
    } catch (error) {
      console.error('Error fetching user info:', error)
      throw error
    }
  }

  const logout = async (userId: string) => {
    try {
      const response = await authAxios().post('logout', { userId })
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
