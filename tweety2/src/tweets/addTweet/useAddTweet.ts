import { useTweetStore } from '@/tweets/_store/useTweetStore'
import { useAuthStore } from '@/user/_store/auth.store'
import { Api } from '@/api/generated/api'

export const useAddTweet = () => {
  const api = new Api({ baseUrl: 'http://localhost:4000' })
  const { setTweetList } = useTweetStore()
  const { accessToken } = useAuthStore()

  const addTweet = async (value: string, userId: string): Promise<boolean> => {
    if (value.trim() === '' || !userId || !accessToken) return false
    try {
      await api.tweety.tweetyControllerCreateTweet(
        {
          content: value,
          userId,
        },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      )
      // Po úspešnom pridaní tweetu refetchneme všetky tweety:
      const tweets = await api.tweety.tweetyControllerGetAllTweeties({
        format: 'json',
      })
      setTweetList(tweets.data)
      return true
    } catch (error) {
      console.error('Failed to add tweet via API:', error)
      return false
    }
  }
  return { addTweet }
}
