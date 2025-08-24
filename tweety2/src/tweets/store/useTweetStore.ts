import { create } from 'zustand'

type TweetProps = {
  tweetList: object[]
}

type TweetActions = {
  setTweetList: (tweets: object[]) => void
}

export const useTweetStore = create<TweetProps & TweetActions>((set) => ({
  tweetList: [],
  setTweetList: (tweets) => set({ tweetList: tweets }),
}))
