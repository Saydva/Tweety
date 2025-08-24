import { useTweetStore } from '@/tweets/store/useTweetStore'
import { useLocalStorage } from '@/tweets/store/useLocalStorage'
import { useTweetAxios } from '../store/axios.tweet'
import { useUserStore } from '@/user/userStore/user.store'

export const useAddTweet = () => {
  const { tweetList, setTweetList } = useTweetStore()
  const { saveTweetsToLS } = useLocalStorage()
  const { addTweetAxios } = useTweetAxios()
  const { name } = useUserStore()

  const addTweet = async (value: string) => {
    if (value.trim() === '') return
    try {
      const newTweet = await addTweetAxios(value, name, false)
      const updatedList = [...tweetList, newTweet]
      setTweetList(updatedList)
      saveTweetsToLS(updatedList)
    } catch (error) {
      console.error('Failed to add tweet via API:', error)
    }
  }

  return { addTweet }
}
