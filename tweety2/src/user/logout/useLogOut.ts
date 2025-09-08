import { useUserStore } from '../_store/user.store'
import { useAuthAxios } from '../_utils/axios.auth'

export const useLogOut = () => {
  const { _id, resetUser, setIsLoggedIn, setMessage } = useUserStore()
  const { logout } = useAuthAxios()

  const logOutHandler = async () => {
    try {
      await logout(_id)
      setMessage('Logout successful!')
      resetUser()
      setIsLoggedIn(false)
    } catch (error) {
      console.error('Logout failed:', error)
      alert('Logout failed. Please try again.')
    }
  }

  return { logOutHandler }
}
