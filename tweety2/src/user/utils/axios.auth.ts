import axios from 'axios'
import { useUserStore } from '@/user/userStore/user.store'

export const useAuthAxios = () => {
  const { accessToken } = useUserStore()
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

  const signupAxios = async (name: string, email: string, password: string) => {
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

  const loginAxios = async (email: string, password: string) => {
    try {
      const response = await authAxios().post('login', { email, password })
      return response.data
    } catch (error) {
      console.error('Error during login:', error)
      throw error
    }
  }

  const logoutAxios = async (userId: string) => {
    try {
      const response = await authAxios().post('logout', { userId })
      return response.data
    } catch (error) {
      console.error('Error during logout:', error)
      throw error
    }
  }

  return {
    signupAxios,
    loginAxios,
    logoutAxios,
  }
}
