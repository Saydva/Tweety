import { create } from 'zustand';

type TweetProps = {
  tweetList: string[];
};

type TweetActions = {
  setTweetList: (tweets: string[]) => void;
};

export const useTweetStore = create<TweetProps & TweetActions>((set) => ({
  tweetList: [],
  setTweetList: (tweets) => set({ tweetList: tweets }),
}));
