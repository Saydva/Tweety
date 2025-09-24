import { create } from 'zustand'
import type { Tweety } from '@/api/generated/api'

type TweetListProps = {
  tweetList: Tweety[]
}

type TweetActions = {
  setTweetList: (tweets: Tweety[]) => void
}

export const useTweetStore = create<TweetListProps & TweetActions>((set) => ({
  tweetList: [],
  setTweetList: (tweets: Tweety[]) => set({ tweetList: tweets }),
}))
