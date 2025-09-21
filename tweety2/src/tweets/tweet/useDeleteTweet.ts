import { useAuthStore } from '@/user/_store/auth.store'
import { useTweetStore } from '../_store/useTweetStore'
import { TweetyApi } from '@/api'

export const useDeleteTweet = () => {
  const api = new TweetyApi(undefined, 'http://localhost:4000')
  const { tweetList, setTweetList } = useTweetStore()
  const { accessToken } = useAuthStore()
  const deleteTweet = async (tweetId: string) => {
    if (!tweetId || !accessToken) return
    try {
      await api.tweetyControllerDeleteTweety(tweetId, {
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
