import { useEffect } from "react";
import { useTweetStore } from "../store/tweet.store";

export const useLocalStorageHandler = () => {
  const { tweetList, setTweetList, isLLSEnabled, setIsLLSEnabled } =
    useTweetStore();

  useEffect(() => {
    const storedTweets = localStorage.getItem("tweets");
    if (storedTweets) {
      setTweetList(JSON.parse(storedTweets));
    }
    setIsLLSEnabled(true);
  }, [setTweetList, setIsLLSEnabled]);

  useEffect(() => {
    if (isLLSEnabled) {
      localStorage.setItem("tweets", JSON.stringify(tweetList));
    }
  }, [tweetList, isLLSEnabled]);

  return { isLLSEnabled };
};
