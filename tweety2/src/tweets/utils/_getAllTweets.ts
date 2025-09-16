import { axiosInstance } from '@/utils/axios'

export const _getAllTweets = async () => {
  try {
    const response = await axiosInstance().get('tweety')
    return response.data
  } catch (error) {
    console.error('Failed to fetch tweets via API:', error)
    return []
  }
}
