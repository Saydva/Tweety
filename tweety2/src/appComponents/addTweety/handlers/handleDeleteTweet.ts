import { useTweetStore } from "../../store/tweet.sore";

export const useDeleteTweet = () => {
  const { tweetList, setTweetList } = useTweetStore();

  const deleteTweet = (index: number) => {
    const updatedList = tweetList.filter((_, i) => i !== index);
    setTweetList(updatedList);
  };

  return { deleteTweet };
};
