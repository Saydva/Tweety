import { useTweetStore } from '@/tweets/_store/useTweetStore'
import { useAuthStore } from '@/user/_store/auth.store'
import { TweetyApi } from '@/api'
import type { Tweet } from '@/tweets/_store/useTweetStore'
import type { AxiosResponse } from 'axios'

export const useAddTweet = () => {
  const api = new TweetyApi(undefined, 'http://localhost:4000')
  const { tweetList, setTweetList } = useTweetStore()
  const { accessToken } = useAuthStore()

  const addTweet = async (value: string, userId: string): Promise<boolean> => {
    if (value.trim() === '' || !userId || !accessToken) return false
    try {
      const response = (await api.tweetyControllerCreateTweet(
        {
          content: value,
          userId,
        },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      )) as AxiosResponse
      const newTweet = response.data as Tweet
      // Prepend the new tweet to the existing tweet list
      setTweetList([newTweet, ...tweetList])
      return true
    } catch (error) {
      console.error('Failed to add tweet via API:', error)
      return false
    }
  }
  return { addTweet }
}
