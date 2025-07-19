import { useTweetStore } from "../store/tweet.store";
import { useLocalStorage } from "../store/tweetStorageUtils";

export const useDeleteTweet = () => {
  const { tweetList, setTweetList } = useTweetStore();
  const { saveTweetsToLS } = useLocalStorage();

  // Function to delete a tweet by index
  const deleteTweet = (index: number) => {
    const updatedList = tweetList.filter((_, i) => i !== index);
    saveTweetsToLS(updatedList);
    setTweetList(updatedList);
  };

  return { deleteTweet };
};
