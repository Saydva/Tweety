import { useAuthStore } from "../../../stores/auth/auth.store";
import { useTweetStore } from "./newTweety/add.tweety.store";
import { messageAPI } from "./tweety.methods";

export const useTweetyActions = () => {
  const { user, id, accessToken } = useAuthStore();
  const { setUserId, setDate, setOwner, content } = useTweetStore();

  const handleSendTweet = async () => {
    if (!content.trim()) {
      alert("Please enter a tweet");
      return;
    }
    setUserId(id ?? "");
    setOwner(user || "Anonymous");
    setDate(new Date().toISOString());
    const tweetData = {
      userId: id ?? "",
      content: content,
      date: new Date().toISOString(),
      comments: [],
      likes: 0,
      owner: user || "Anonymous",
      myLike: false,
    };
    try {
      await messageAPI.sendMessage(tweetData, accessToken ?? "");
      console.log("Tweet sent successfully", tweetData);
    } catch (error) {
      console.error("Error sending tweet:", error);
      alert("Failed to send tweet. Please try again.");
    }
  };

  const handleGetAll = async () => {
    try {
      const tweets = await messageAPI.getAllTweets(accessToken ?? "");
      console.log("All tweets fetched successfully", tweets);
      return tweets;
    } catch (error) {
      alert("Failed to fetch tweets. Please try again.");
      console.error("Error fetching tweets:", error);
    }
  };

  return {
    handleSendTweet,
    handleGetAll,
  };
};
