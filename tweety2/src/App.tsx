import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useTweetAxios } from './tweets/_store/axios.tweet'
import { BrowserRouter } from 'react-router-dom'

import HomeComp from './home/HomeComp'
import Navbar from './navbar/Navbar'
import SignUp from './user/signUp/SignUp'
import Login from './user/login/Login'

function App() {
  const { getTweetsAxios } = useTweetAxios()
  useEffect(() => {
    getTweetsAxios()
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
