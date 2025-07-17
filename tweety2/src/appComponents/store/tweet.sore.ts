import { create } from "zustand";

type TweetProps = {
  tweetList: string[];
  tweetValue: string;
};

type TweetActions = {
  setTweetList: (tweets: string[]) => void;
  setTweetValue: (value: string) => void;
  resetValue: () => void;
};

export const useTweetStore = create<TweetProps & TweetActions>((set, get) => ({
  tweetList: [],
  tweetValue: "",
  setTweetList: (tweets) => set({ tweetList: tweets }),
  setTweetValue: (value) => set({ tweetValue: value }),
  resetValue: () => set({ tweetValue: "" }),
}));
