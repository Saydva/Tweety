import { useTweetStore } from '@/tweets/_store/useTweetStore'
import { useAuthStore } from '@/user/_store/auth.store'
import { axiosInstance } from '@/utils/axios'

export const useAddTweet = () => {
  const { tweetList, setTweetList } = useTweetStore()
  const { accessToken } = useAuthStore()
  const addTweet = async (value: string, userId: string): Promise<boolean> => {
    if (value.trim() === '' || !userId || !accessToken) return false
    try {
      const response = await axiosInstance(accessToken as string).post(
        'tweety',
        {
          content: value,
          userId,
        }
      )
      const newTweet = response.data
      setTweetList([...tweetList, newTweet])
      return true
    } catch (error) {
      console.error('Failed to add tweet via API:', error)
      return false
    }
  }
  return { addTweet }
}
