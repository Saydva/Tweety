import { useUserStore } from '@/user/_store/user.store'
import { useTweetAxios } from '../_store/axios.tweet'

type TweetProps = {
  tweet: { _id: string; owner: string; content: string }
}

const Tweet = ({ tweet }: TweetProps) => {
  const { isLoggedIn, name } = useUserStore()
  const { deleteTweet, getTweetsAxios } = useTweetAxios()
  return (
    <div className=' bg-base-100 border-primary-content border rounded-md shadow-sm  my-4'>
      <div className='flex flex-row justify-between items-baseline m-2'>
        <p>
          <span className='font-bold'>{tweet.owner} tweeted: </span>
          {tweet.content}
        </p>
        {isLoggedIn && tweet.owner === name && (
          <button
            onClick={() => {
              deleteTweet(tweet._id)
              getTweetsAxios()
            }}
            className='btn btn-secondary btn-sm'
          >
            Delete
          </button>
        )}
      </div>
    </div>
  )
}

export default Tweet
