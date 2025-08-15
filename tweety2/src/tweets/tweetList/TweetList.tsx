import { useTweetStore } from '@/tweets/store/tweet.store'
import { useDeleteTweet } from './handleDeleteTweet'
import { useUserStore } from '@/user/userStore/user.store'

const TweetList = () => {
  const { tweetList } = useTweetStore()
  const { deleteTweet } = useDeleteTweet()
  const { isLoggedIn } = useUserStore()

  const itemList = tweetList.map((tweet: string, index: number) => (
    <div
      key={index}
      className='tweety-item flex justify-between items-center my-2'
    >
      <span>{tweet}</span>
      {isLoggedIn && (
        <button onClick={() => deleteTweet(index)} className='btn'>
          Delete
        </button>
      )}
    </div>
  ))

  return <div>{itemList}</div>
}

export default TweetList
