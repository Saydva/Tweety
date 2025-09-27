import { useTweetStore } from '@/tweets/_store/useTweetStore'
import Tweet from '../tweet/Tweet'
import type { TweetyResponseDto } from '@/api/generated/api'

const TweetList = () => {
  const { tweetList } = useTweetStore()

  const itemList = tweetList.map((tweet: TweetyResponseDto) => (
    <div key={tweet.id}>
      <Tweet {...tweet} />
    </div>
  ))

  return (
    <div>
      <span className='text-sm font-bold pl-2'></span>
      {itemList}
    </div>
  )
}

export default TweetList
