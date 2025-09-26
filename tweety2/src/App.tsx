import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Api, type TweetyResponseDto } from './api/generated/api'
import { BrowserRouter } from 'react-router-dom'

import HomeComp from './home/HomeComp'
import Navbar from './navbar/Navbar'
import SignUp from './user/signUp/SignUp'
import Login from './user/login/Login'

import { useTweetStore } from './tweets/_store/useTweetStore'
import { useAuthStore } from './user/_store/auth.store'
import { useUserStore } from './user/_store/user.store'
import { useAuthLocalStorage } from './user/_store/auth.localStorage.handler'

function App() {
  const { setTweetList } = useTweetStore()
  const { setTokens } = useAuthStore()
  const { setId, setName, setIsLoggedIn } = useUserStore()

  const { loadAuth } = useAuthLocalStorage()

  const api = new Api({ baseUrl: 'http://localhost:4000' })

  useEffect(() => {
    const fetchTweets = async () => {
      const response = await api.tweety.tweetyControllerGetAllTweeties()
      setTweetList(response.data as TweetyResponseDto[])
    }
    fetchTweets()
  }, [setTweetList])

  useEffect(() => {
    const authData = loadAuth()
    const { accessToken, refreshToken, userId, name } = authData

    if (accessToken && refreshToken && userId && name) {
      setTokens(accessToken, refreshToken)
      setId(userId)
      setName(name)
      setIsLoggedIn(true)
    }
  }, [])

  return (
    <BrowserRouter>
      <div className='App flex flex-col h-screen w-xl mx-auto'>
        <Navbar />
        <Routes>
          <Route path='/' element={<HomeComp />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
