import { useEffect } from "react";
import AddTweet from "./appComponents/addTweety/AddTweet";
import { useTweetStore } from "./appComponents/store/tweet.sore";
import TweetList from "./appComponents/addTweety/TweetList";

function App() {
  const { tweetList, setTweetList } = useTweetStore();

  useEffect(() => {
    const storedTweets = localStorage.getItem("tweetyList");
    if (storedTweets) {
      setTweetList(JSON.parse(storedTweets));
    }
  }, [setTweetList]);

  useEffect(() => {
    localStorage.setItem("tweetyList", JSON.stringify(tweetList));
  }, [tweetList]);

  return (
    <div className="App flex flex-col h-screen w-xl mx-auto">
      <AddTweet />
      <TweetList />
    </div>
  );
}

export default App;
