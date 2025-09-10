import { useAuthStore } from '@/user/_store/auth.store'
import { useTweetStore } from '../_store/useTweetStore'
import { _tweetsAxios } from '../utils/_tweetsAxios'

export const useDeleteTweet = () => {
  const { tweetList, setTweetList } = useTweetStore()
  const { accessToken } = useAuthStore()
  const deleteTweet = async (tweetId: string) => {
    if (!tweetId || !accessToken) return
    try {
      await _tweetsAxios(accessToken as string).delete(`tweety/${tweetId}`)
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
