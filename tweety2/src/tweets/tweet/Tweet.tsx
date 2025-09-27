import { useUserStore } from '@/user/_store/user.store'
import { useDeleteTweet } from './useDeleteTweet'
import type { TweetyResponseDto } from '@/api/generated/api'

const Tweet = (tweet: TweetyResponseDto) => {
  const { isLoggedIn, name } = useUserStore()
  const { deleteTweet } = useDeleteTweet()

  return (
    <div className=' bg-base-100 border-primary-content border rounded-md shadow-sm  my-4'>
      <div className='flex flex-row justify-between items-baseline m-2'>
        <p>
          <span className='font-bold'>{tweet.owner} tweeted: </span>
          {tweet.content}
        </p>
        {isLoggedIn && tweet.owner === name && (
          <button
            onClick={async () => {
              await deleteTweet(tweet.id)
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
