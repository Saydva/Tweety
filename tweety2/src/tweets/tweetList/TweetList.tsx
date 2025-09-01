import { useTweetStore } from '@/tweets/store/useTweetStore'
import { useTweetAxios } from '../store/axios.tweet'
import { useUserStore } from '@/user/userStore/user.store'

type Tweet = {
  _id: string
  owner: string
  content: string
  // pridaj ďalšie polia podľa potreby (napr. date, comments, ...)
}

const TweetList = () => {
  const { tweetList } = useTweetStore()
  const { deleteTweet, getTweetsAxios } = useTweetAxios()
  const { isLoggedIn, name } = useUserStore()

  const itemList = tweetList
    .map((tweet) => (
      <div
        key={tweet._id}
        className='tweety-item flex justify-between items-center my-2'
      >
        <span>
          {tweet.owner} : {tweet.content}
        </span>
        {isLoggedIn && tweet.owner === name && (
          <button
            onClick={() => {
              deleteTweet(tweet._id)
              getTweetsAxios()
            }}
            className='btn'
          >
            Delete
          </button>
        )}
      </div>
    ))
    .reverse()

  return <div>{itemList}</div>
}

export default TweetList
