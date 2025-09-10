import axios from 'axios'

const _tweetsAxios = () =>
  axios.create({
    baseURL: 'http://localhost:4000/',
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
    },
  })

export const _getAllTweets = async () => {
  try {
    const response = await _tweetsAxios().get('tweety')
    return response.data
  } catch (error) {
    console.error('Failed to fetch tweets via API:', error)
    return []
  }
}
