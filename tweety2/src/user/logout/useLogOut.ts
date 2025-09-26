import { useUserStore } from '@/user/_store/user.store'
import { useAuthStore } from '@/user/_store/auth.store'
import { useAuthApi } from '@/user/_utils/api.auth'
import { useAuthLocalStorage } from '../_store/auth.localStorage.handler'

export const useLogOut = () => {
  const { _id, resetUser, setIsLoggedIn, setMessage } = useUserStore()
  const { clearTokens } = useAuthStore()
  const { logout } = useAuthApi()
  const { clearAuth } = useAuthLocalStorage()

  const logOutHandler = async () => {
    try {
      await logout(_id)
      setMessage('Logout successful!')
      resetUser()
      setIsLoggedIn(false)
      clearTokens()
      clearAuth()
    } catch (error) {
      console.error('Logout failed:', error)
      alert('Logout failed. Please try again.')
    }
  }

  return { logOutHandler }
}
