import { useState } from 'react'
import { useAddTweet } from './useAddTweet'
import { useUserStore } from '@/user/userStore/user.store'
const AddTweet = () => {
  const [value, setValue] = useState('')
  const { addTweet } = useAddTweet()
  const { isLoggedIn, _id } = useUserStore()

  return isLoggedIn ? (
    <div className='flex flex-row justify-between mt-3'>
      <input
        id='tweet'
        value={value}
        onChange={(e) => setValue(e.target.value)}
        type='text'
        placeholder='. . .'
        className='input'
      />
      <button
        onClick={() => {
          addTweet(value, _id)
          setValue('')
        }}
        className={`btn + ${value ? ' btn-primary' : ' btn-disabled'}`}
        disabled={!value}
      >
        Add
      </button>
    </div>
  ) : null
}

export default AddTweet
