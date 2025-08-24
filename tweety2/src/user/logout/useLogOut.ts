import { useUserStore } from '../userStore/user.store'
import { useAuthAxios } from '../utils/axios.auth'

export const useLogOut = () => {
  const { _id, resetUser, setIsLoggedIn, setMessage } = useUserStore()
  const { logoutAxios } = useAuthAxios()

  const logout = async () => {
    try {
      await logoutAxios(_id)
      setMessage('Logout successful!')
      resetUser()
      setIsLoggedIn(false)
    } catch (error) {
      console.error('Logout failed:', error)
      alert('Logout failed. Please try again.')
    }
  }

  return { logout }
}
