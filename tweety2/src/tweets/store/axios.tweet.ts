import axios from 'axios'
import { useUserStore } from '@/user/userStore/user.store'
import { useLocalStorage } from './useLocalStorage'
import { useTweetStore } from './useTweetStore'

export const useTweetAxios = () => {
  const { accessToken } = useUserStore()
  const { loadTweetsFromLS, saveTweetsToLS } = useLocalStorage()
  const { setTweetList } = useTweetStore()

  const tweetAxios = () => {
    return axios.create({
      baseURL: 'http://localhost:4000/',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
        ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
      },
    })
  }

  const addTweetAxios = async (
    content: string,
    owner: string,
    myLike: boolean
  ) => {
    try {
      const response = await tweetAxios().post('tweety', {
        content,
        owner,
        date: new Date().toISOString(),
        myLike,
      })
      saveTweetsToLS([...loadTweetsFromLS(), response.data])
      return response.data
    } catch (error) {
      console.error('Error adding tweet:', error)
      alert('Adding tweet failed. Please try again.')
      throw error
    }
  }

  const getTweetsAxios = async () => {
    try {
      const response = await tweetAxios().get('tweety')
      loadTweetsFromLS()
      setTweetList(response.data)
      return response.data
    } catch (error) {
      console.error('Error fetching tweets:', error)
      alert('Fetching tweets failed. Please try again.')
      throw error
    }
  }

  const deleteTweet = async (tweetId: string) => {
    try {
      const response = await tweetAxios().delete(`tweety/${tweetId}`)
      saveTweetsToLS(
        loadTweetsFromLS().filter((tweet: any) => tweet.id !== tweetId)
      )

      return response.data
    } catch (error) {
      console.error('Error deleting tweet:', error)
      alert('Deleting tweet failed. Please try again.')
      throw error
    }
  }

  return {
    addTweetAxios,
    getTweetsAxios,
    deleteTweet,
  }
}
