import { create } from "zustand";

type TweetProps = {
  tweetList: string[];
  tweetValue: string;
  isLLSEnabled: boolean;
};

type TweetActions = {
  setTweetList: (tweets: string[]) => void;
  setTweetValue: (value: string) => void;
  resetValue: () => void;
  setIsLLSEnabled: (enabled: boolean) => void;
};

export const useTweetStore = create<TweetProps & TweetActions>((set) => ({
  tweetList: [],
  tweetValue: "",
  isLLSEnabled: false,
  setTweetList: (tweets) => set({ tweetList: tweets }),
  setTweetValue: (value) => set({ tweetValue: value }),
  resetValue: () => set({ tweetValue: "" }),
  setIsLLSEnabled: (enabled) => set({ isLLSEnabled: enabled }),
}));
