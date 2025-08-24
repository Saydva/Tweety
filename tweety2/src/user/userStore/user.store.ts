import { create } from 'zustand'

export type UserProps = {
  _id: string
  accessToken: string
  refreshToken: string
  name: string
  isLoggedIn: boolean
  message: string
}

type UserActions = {
  setId: (id: string) => void
  setAccessToken: (token: string) => void
  setRefreshToken: (token: string) => void
  setName: (name: string) => void
  resetUser: () => void
  setIsLoggedIn: (isLoggedIn: boolean) => void
  setMessage: (message: string) => void
}

export const useUserStore = create<UserProps & UserActions>((set) => ({
  _id: '',
  accessToken: '',
  refreshToken: '',
  name: '',
  isLoggedIn: false,
  message: 'Login in',

  setId: (id) => set({ _id: id }),
  setAccessToken: (token) => set({ accessToken: token }),
  setRefreshToken: (token) => set({ refreshToken: token }),
  setName: (name) => set({ name }),
  setIsLoggedIn: (isLoggedIn) => set({ isLoggedIn }),
  setMessage(message) {
    set({ message })
  },

  resetUser: () =>
    set({
      _id: '',
      accessToken: '',
      refreshToken: '',
      name: '',
    }),
}))
