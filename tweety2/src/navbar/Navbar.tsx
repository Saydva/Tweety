import { useState } from 'react';
import { Menu } from 'react-feather';
import { Link } from 'react-router-dom';
import { useUserStore } from '@/user/userStore/user.store';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { name } = useUserStore();
  return (
    <div className='navbar bg-base-100 shadow-sm'>
      <div className='flex-1'>
        <div className='dropdown dropdown-open flex flex-row justify-between'>
          <div onClick={() => setIsOpen(!isOpen)}>
            <Menu />
            <ul
              className={`dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm 
            ${isOpen ? '' : 'hidden'}`}
            >
              <li>
                <Link to='/' onClick={() => setIsOpen(!isOpen)}>
                  Home
                </Link>
              </li>
              <li>
                <Link to='/signup' onClick={() => setIsOpen(!isOpen)}>
                  Sign Up
                </Link>
              </li>
              <li>
                <Link to='/login' onClick={() => setIsOpen(!isOpen)}>
                  Login
                </Link>
              </li>
            </ul>
          </div>
          <div>
            {name !== '' ? (
              <span className='text-lg font-bold'>Welcome, {name}!</span>
            ) : (
              <span className='text-lg font-bold'>Welcome!</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
