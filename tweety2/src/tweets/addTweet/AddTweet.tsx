import { useState } from 'react'
import { useAddTweet } from './useAddTweet'
import { useUserStore } from '@/user/_store/user.store'
const AddTweet = () => {
  const [value, setValue] = useState('')
  const [error, setError] = useState('')
  const { addTweet } = useAddTweet()
  const { isLoggedIn, _id } = useUserStore()

  const handleAddTweet = async () => {
    const success = await addTweet(value, _id)
    if (success) {
      setValue('')
      setError('')
    } else {
      setError('Nepodarilo sa odoslať tweet. Skúste znova.')
    }
  }

  return isLoggedIn ? (
    <div>
      <div className='flex flex-row justify-between mt-3'>
        <label htmlFor='tweet'>New tweet :</label>
        <input
          id='tweet'
          value={value}
          onChange={(e) => setValue(e.target.value)}
          type='text'
          placeholder='. . .'
          className='input'
        />
        <button
          onClick={handleAddTweet}
          className={`btn + ${value ? ' btn-primary' : ' btn-disabled'}`}
          disabled={!value}
        >
          Add
        </button>
      </div>
      {error && <p className='text-red-500 ml-2 text-center'>{error}</p>}
    </div>
  ) : null
}

export default AddTweet
