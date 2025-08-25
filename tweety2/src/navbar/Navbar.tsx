import { useUserStore } from '@/user/userStore/user.store'
import { useLogOut } from '@/user/logout/useLogOut'
import { Link } from 'react-router-dom'

const Navbar = () => {
  const { name, isLoggedIn } = useUserStore()
  const { logout } = useLogOut()

  return (
    <div className='static navbar bg-base-100 shadow-sm'>
      <div className='flex-1'>
        <div className='dropdown dropdown-open flex flex-row justify-between'>
          <div>
            <button className='btn btn-primary'>
              <Link to='/'>Home</Link>
            </button>
            {name !== '' ? (
              <span className='text-sm font-bold pl-2'>Welcome, {name}!</span>
            ) : (
              <span className='text-sm font-bold pl-2'>Not Logged in</span>
            )}
          </div>
          <div>
            {isLoggedIn ? (
              <button className='btn rounded-4xl' onClick={() => logout()}>
                Log out
              </button>
            ) : (
              <>
                <button className='btn rounded-4xl'>
                  <Link to='/login '>Login</Link>
                </button>
                <button className='btn rounded-4xl'>
                  <Link to='/signup'>Sign Up</Link>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
