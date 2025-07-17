import { useAuthStore } from "../../../../stores/auth/auth.store";
import { useTweetStore } from "../newTweety/addTweety.store";
import { messageAPI } from "./tweety.methods";
import { useTweetsListStore } from "../tweetsList/tweetsList.store";

export const useTweetyActions = () => {
  const { user, accessToken } = useAuthStore();
  const { setDate, setOwner, content, resetContent } = useTweetStore();
  const { setTweets, tweets } = useTweetsListStore();

  const handleSendTweet = async () => {
    if (!content.trim()) {
      alert("Please enter a tweet");
      return;
    }
    if (!accessToken) {
      alert("You need to be logged in to send a tweet.");
      return;
    }
    setOwner(user || "Anonymous");
    setDate(new Date().toISOString());

    const tweetData = {
      content: content,
      date: new Date().toISOString(),
      comments: [],
      likes: 0,
      owner: user || "Anonymous",
      myLike: false,
    };
    try {
      await messageAPI.sendMessage(tweetData, accessToken ?? "");
      handleGetAll(); // Refresh the tweet list after sending a new tweet
      resetContent(); // Reset the content after sending
    } catch (error) {
      console.error("Error sending tweet:", error);
      alert("Failed to send tweet. Please try again.");
    }
  };

  const handleGetAll = async () => {
    if (!accessToken) {
      alert("You need to be logged in to fetch tweets.");
      return;
    }
    try {
      const allTweets = await messageAPI.getAllTweets(accessToken ?? "");
      setTweets(allTweets);
      return tweets;
    } catch (error) {
      alert("Failed to fetch tweets. Please try again.");
      console.error("Error fetching tweets:", error);
    }
  };

  const handleDeleteTweet = async (tweetId: string) => {
    if (!accessToken) {
      alert("You need to be logged in to delete tweets.");
      return;
    }
    try {
      await messageAPI.deleteTweet(tweetId, accessToken ?? "");
      setTweets(tweets.filter((tweet) => tweet._id !== tweetId));
      console.log("Tweet deleted successfully");
    } catch (error) {
      console.error("Error deleting tweet:", error);
      alert("Failed to delete tweet. Please try again.");
    }
  };

  return {
    handleSendTweet,
    handleGetAll,
    handleDeleteTweet,
  };
};
