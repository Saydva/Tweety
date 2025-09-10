import { useUserStore } from '../_store/user.store'
import { useAuthStore } from '../_store/auth.store'
import { useAuthAxios } from '../_utils/axios.auth'

export const useLogOut = () => {
  const { _id, resetUser, setIsLoggedIn, setMessage } = useUserStore()
  const { clearTokens } = useAuthStore()
  const { logout } = useAuthAxios()

  const logOutHandler = async () => {
    try {
      await logout(_id)
      setMessage('Logout successful!')
      resetUser()
      setIsLoggedIn(false)
      clearTokens()
    } catch (error) {
      console.error('Logout failed:', error)
      alert('Logout failed. Please try again.')
    }
  }

  return { logOutHandler }
}
