import { useTweetStore } from '@/tweets/store/useTweetStore'
import { useTweetAxios } from '../store/axios.tweet'
import { useUserStore } from '@/user/userStore/user.store'

const TweetList = () => {
  const { tweetList } = useTweetStore()
  const { deleteTweet, getTweetsAxios } = useTweetAxios()
  const { isLoggedIn } = useUserStore()

  const itemList = tweetList.map((tweet: any) => (
    <div
      key={tweet._id}
      className='tweety-item flex justify-between items-center my-2'
    >
      <span>
        {tweet.owner} : {tweet.content}
      </span>
      {isLoggedIn && (
        <button
          onClick={() => {
            deleteTweet(tweet._id), getTweetsAxios()
          }}
          className='btn'
        >
          Delete
        </button>
      )}
    </div>
  ))

  return <div>{itemList}</div>
}

export default TweetList
