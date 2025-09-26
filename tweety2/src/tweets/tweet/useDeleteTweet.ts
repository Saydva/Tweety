import { useAuthStore } from '@/user/_store/auth.store'
import { useTweetStore } from '../_store/useTweetStore'
import { Api } from '@/api/generated/api'

export const useDeleteTweet = () => {
  const api = new Api({ baseUrl: 'http://localhost:4000' })
  const { tweetList, setTweetList } = useTweetStore()
  const { accessToken } = useAuthStore()
  const deleteTweet = async (tweetId: string) => {
    if (!tweetId || !accessToken) return
    try {
      await api.tweety.tweetyControllerDeleteTweety(tweetId, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      const updatedTweetList = tweetList.filter(
        (tweet) => tweet._id !== tweetId
      )
      setTweetList(updatedTweetList)
    } catch (error) {
      console.error('Failed to delete tweet via API:', error)
    }
  }
  return { deleteTweet }
}
