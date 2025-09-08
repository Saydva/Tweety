import { useTweetStore } from '@/tweets/_store/useTweetStore'
import Tweet from '../tweet/tweet'

const TweetList = () => {
  const { tweetList } = useTweetStore()

  const itemList = tweetList
    .map((tweet) => (
      <div key={tweet._id}>
        <Tweet tweet={tweet} />
      </div>
    ))
    .reverse()

  return (
    <div>
      <span className='text-sm font-bold pl-2'></span>
      {itemList}
    </div>
  )
}

export default TweetList
