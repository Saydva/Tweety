import axios from 'axios'

export const _tweetsAxios = (accessToken: string) =>
  axios.create({
    baseURL: 'http://localhost:4000/',
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
      ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
    },
  })
