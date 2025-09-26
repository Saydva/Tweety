export const useAuthLocalStorage = () => {
  const saveAuth = (
    accessToken: string,
    refreshToken: string,
    userId: string,
    name: string
  ) => {
    localStorage.setItem('accessToken', accessToken)
    localStorage.setItem('refreshToken', refreshToken)
    localStorage.setItem('userId', userId)
    localStorage.setItem('name', name)
  }

  const loadAuth = () => {
    return {
      accessToken: localStorage.getItem('accessToken') || '',
      refreshToken: localStorage.getItem('refreshToken') || '',
      userId: localStorage.getItem('userId') || '',
      name: localStorage.getItem('name') || '',
    }
  }

  const clearAuth = () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('userId')
    localStorage.removeItem('name')
  }

  return { saveAuth, loadAuth, clearAuth }
}
