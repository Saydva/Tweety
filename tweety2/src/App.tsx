import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { TweetyApi } from './api'
import { BrowserRouter } from 'react-router-dom'

import { useAuthApi } from './user/_utils/api.auth'
import { useAuthStore } from './user/_store/auth.store'

import HomeComp from './home/HomeComp'
import Navbar from './navbar/Navbar'
import SignUp from './user/signUp/SignUp'
import Login from './user/login/Login'
import { useUserStore, type UserProps } from './user/_store/user.store'
import { useTweetStore, type Tweet } from './tweets/_store/useTweetStore'

function App() {
  const { accessToken } = useAuthStore()
  const { setTweetList } = useTweetStore()

  const { getUserInfo } = useAuthApi()
  const { setId, setName, setIsLoggedIn } = useUserStore()

  const api = new TweetyApi(undefined, 'http://localhost:4000')

  useEffect(() => {
    const fetchTweets = async () => {
      const response = (await api.tweetyControllerGetAllTweeties()) as
        | Tweet[]
        | any
      setTweetList(response.data)
    }
    fetchTweets()
  }, [setTweetList])

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (accessToken) {
        try {
          const data = (await getUserInfo()) as UserProps
          setId(data._id)
          setName(data.name)
          setIsLoggedIn(true)
        } catch (error) {
          console.error('Failed to fetch user info:', error)
        }
      }
    }
    fetchUserInfo()
  }, [accessToken, setId, setName, setIsLoggedIn])

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
