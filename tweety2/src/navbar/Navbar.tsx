import { useUserStore } from '@/user/_store/user.store'
import { useLogOut } from '@/user/logout/useLogOut'
import { Link } from 'react-router-dom'

const Navbar = () => {
  const { name, isLoggedIn } = useUserStore()
  const { logOutHandler } = useLogOut()

  return (
    <div className='static rounded-md navbar bg-base-100 shadow-sm mt-3'>
      <div className='flex-1'>
        <div className='dropdown dropdown-open flex flex-row justify-between'>
          <div className='text-2xl font-bold pl-2 hover:text-shadow-lg'>
            <Link to='/'>Tweety</Link>
          </div>
          <div>
            {name !== '' ? (
              <span className='text-sm font-bold pl-2'>Welcome, {name}!</span>
            ) : (
              <span className='text-sm font-bold pl-2'>Not Logged in</span>
            )}
          </div>
          <div>
            {isLoggedIn ? (
              <button
                className='btn hover:btn-error rounded-4xl'
                onClick={() => logOutHandler()}
              >
                Log out
              </button>
            ) : (
              <>
                <button className='btn hover:btn-accent rounded-4xl mr-2'>
                  <Link to='/login '>Login</Link>
                </button>
                <button className='btn hover:btn-success rounded-4xl'>
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
