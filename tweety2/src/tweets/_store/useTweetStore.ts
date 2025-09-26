import { create } from 'zustand'
import type { TweetyResponseDto } from '@/api/generated/api'

type TweetListProps = {
  tweetList: TweetyResponseDto[]
}

type TweetActions = {
  setTweetList: (tweets: TweetyResponseDto[]) => void
}

export const useTweetStore = create<TweetListProps & TweetActions>((set) => ({
  tweetList: [],
  setTweetList: (tweets: TweetyResponseDto[]) => set({ tweetList: tweets }),
}))
