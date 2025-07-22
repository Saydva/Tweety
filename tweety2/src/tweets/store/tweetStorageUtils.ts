import { useTweetStore } from "./tweet.store";

export const useLocalStorage = () => {
  const { setTweetList } = useTweetStore();

  const loadTweetsFromLS = () => {
    const storedTweets = localStorage.getItem("tweets");
    if (storedTweets) {
      setTweetList(JSON.parse(storedTweets));
    }
  };

  const saveTweetsToLS = (tweets: string[]) => {
    localStorage.setItem("tweets", JSON.stringify(tweets));
  };

  return { loadTweetsFromLS, saveTweetsToLS };
};
