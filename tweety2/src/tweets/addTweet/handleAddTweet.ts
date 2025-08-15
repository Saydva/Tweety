import { useTweetStore } from '@/tweets/store/tweet.store'
import { useLocalStorage } from '@/tweets/store/tweetStorageUtils'

export const useAddTweet = () => {
  const { tweetList, setTweetList } = useTweetStore()
  const { saveTweetsToLS } = useLocalStorage()

  const addTweet = (value: string) => {
    if (value.trim() === '') return
    setTweetList([...tweetList, value])
    saveTweetsToLS([...tweetList, value])
  }
  return { addTweet }
}
