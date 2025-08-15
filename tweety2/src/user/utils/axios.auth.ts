import axios from 'axios'
import type { UserInputProps } from '@/user/userStore/user.add.store'

export const useAuthAxios = () => {
  const authAxios = () => {
    return axios.create({
      baseURL: 'http://localhost:4000/auth/',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }

  const signupAxios = async (credentials: UserInputProps) => {
    try {
      const response = await authAxios().post('signup', credentials)
      alert('Registration successful!')
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

  const loginAxios = async (credentials: UserInputProps) => {
    try {
      const response = await authAxios().post('login', credentials)
      alert('Login successful!')
      return response.data
    } catch (error) {
      console.error('Error during login:', error)
      throw error
    }
  }

  return {
    signupAxios,
    loginAxios,
  }
}
