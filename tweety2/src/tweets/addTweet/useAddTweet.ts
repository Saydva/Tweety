import { useTweetStore } from '@/tweets/_store/useTweetStore'
import { handleLocalStorage } from '@/tweets/_store/handleLocalStorage'
import { useTweetAxios } from '../_store/axios.tweet'

export const useAddTweet = () => {
  const { tweetList, setTweetList } = useTweetStore()
  const { saveTweetsToLS } = handleLocalStorage()
  const { addTweetAxios } = useTweetAxios()

  const addTweet = async (value: string, userId: string) => {
    if (value.trim() === '' || !userId) return
    try {
      const newTweet = await addTweetAxios(value, userId)
      const updatedList = [...tweetList, newTweet]
      setTweetList(updatedList)
      saveTweetsToLS(updatedList)
    } catch (error) {
      console.error('Failed to add tweet via API:', error)
    }
  }

  return { addTweet }
}
