import { useTweetStore } from "../../store/tweet.sore";

export const useAddTweet = () => {
  const { tweetValue, tweetList, setTweetList, resetValue } = useTweetStore();

  const addTweet = () => {
    if (tweetValue.trim() === "") return;
    setTweetList([...tweetList, tweetValue]);
    resetValue();
  };
  return { addTweet };
};
