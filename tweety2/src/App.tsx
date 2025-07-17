import { useEffect } from "react";
import AddTweet from "./appComponents/addTweety/AddTweet";
import { useTweetStore } from "./appComponents/store/tweet.sore";
import TweetList from "./appComponents/addTweety/TweetList";

function App() {
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

  if (!isLLSEnabled) return null;

  return (
    <div className="App flex flex-col h-screen w-xl mx-auto">
      <AddTweet />
      <TweetList />
    </div>
  );
}

export default App;
