import axios from 'axios'
import { useUserStore } from '@/user/_store/user.store'
import { handleLocalStorage } from './handleLocalStorage'
import { useTweetStore } from './useTweetStore'

export const useTweetAxios = () => {
  const { accessToken } = useUserStore()
  const { loadTweetsFromLS, saveTweetsToLS } = handleLocalStorage()
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

  const addTweetAxios = async (content: string, userId: string) => {
    try {
      const response = await tweetAxios().post('tweety', {
        content,
        userId,
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
      setTweetList(response.data)
      saveTweetsToLS(response.data)
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
      const updated = loadTweetsFromLS().filter(
        (tweet: any) => tweet._id !== tweetId
      )
      saveTweetsToLS(updated)
      setTweetList(updated)
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
