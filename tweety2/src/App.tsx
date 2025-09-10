import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { _getAllTweets } from './tweets/utils/_getAllTweets'
import { BrowserRouter } from 'react-router-dom'

import { useAuthAxios } from './user/_utils/axios.auth'
import { useAuthStore } from './user/_store/auth.store'

import HomeComp from './home/HomeComp'
import Navbar from './navbar/Navbar'
import SignUp from './user/signUp/SignUp'
import Login from './user/login/Login'
import { useUserStore } from './user/_store/user.store'
import { useTweetStore } from './tweets/_store/useTweetStore'

function App() {
  const { accessToken, refreshToken } = useAuthStore()
  const { setTweetList } = useTweetStore()

  const { getUserInfo } = useAuthAxios()
  const { setId, setName, setIsLoggedIn } = useUserStore()

  useEffect(() => {
    const fetchTweets = async () => {
      const data = await _getAllTweets()
      setTweetList(data)
    }
    fetchTweets()
  }, [setTweetList])

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (accessToken) {
        try {
          const data = await getUserInfo()
          setId(data._id)
          setName(data.name)
          setIsLoggedIn(true)
          console.log(
            'acesToken :' + accessToken,
            'refreshToken :' + refreshToken
          )
        } catch (error) {
          console.error('Failed to fetch user info:', error)
        }
      }
    }
    fetchUserInfo()
  }, [accessToken])

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
