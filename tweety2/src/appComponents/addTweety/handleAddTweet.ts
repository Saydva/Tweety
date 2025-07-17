import { useTweetStore } from "../store/tweet.store";

export const useAddTweet = () => {
  const { tweetValue, tweetList, setTweetList, resetValue } = useTweetStore();

  const addTweet = () => {
    if (tweetValue.trim() === "") return;
    setTweetList([...tweetList, tweetValue]);
    resetValue();
  };
  return { addTweet };
};
