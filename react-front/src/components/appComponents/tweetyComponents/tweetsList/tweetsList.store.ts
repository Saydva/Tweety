import { create } from "zustand";
import type { TweetyProps } from "../newTweety/addTweety.store";

type TweetsListStore = {
  tweets: TweetyProps[];
};

type TweetsListActions = {
  setTweets: (tweets: TweetyProps[]) => void;
};

export const useTweetsListStore = create<TweetsListStore & TweetsListActions>(
  (set) => ({
    tweets: [],

    setTweets: (tweets) => set({ tweets }),
  })
);
