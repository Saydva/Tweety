import { useState } from 'react'
import { useAddTweet } from './useAddTweet'
import { useUserStore } from '@/user/userStore/user.store'

const AddTweet = () => {
  const [value, setValue] = useState('')
  const { addTweet } = useAddTweet()
  const { isLoggedIn } = useUserStore()

  return (
    <div className='flex flex-row justify-between mt-3'>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        type='text'
        placeholder='. . .'
        className={`${isLoggedIn ? '' : 'hidden '}input`}
      />
      <button
        onClick={() => {
          addTweet(value)
          setValue('')
        }}
        className={`${isLoggedIn ? '' : ' hidden'} btn + ${
          value ? ' btn-primary' : ' btn-disabled'
        }`}
        disabled={!value}
      >
        Add
      </button>
    </div>
  )
}

export default AddTweet
