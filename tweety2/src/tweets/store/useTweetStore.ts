import { create } from 'zustand'

type Tweet = {
  _id: string
  owner: string
  content: string
}

type TweetListProps = {
  tweetList: Tweet[]
}

type TweetActions = {
  setTweetList: (tweets: Tweet[]) => void
}

export const useTweetStore = create<TweetListProps & TweetActions>((set) => ({
  tweetList: [],
  setTweetList: (tweets: Tweet[]) => set({ tweetList: tweets }),
}))
