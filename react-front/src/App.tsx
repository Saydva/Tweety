import { useEffect, useState } from "react";
import AddTweety from "./addTweet/addTweety";

function App() {
  const [value, setValue] = useState("");
  const [tweets, setTweets] = useState<string[]>(() => {
    const savedTweets = localStorage.getItem("tweets");
    return savedTweets ? JSON.parse(savedTweets) : [];
  });

  useEffect(() => {
    localStorage.setItem("tweets", JSON.stringify(tweets));
  }, [tweets]);

  return (
    <div className="App flex flex-col items-baseline justify-center min-h-screen gap-2 w-xl mx-auto">
      <AddTweety value={value} setValue={setValue} setTweets={setTweets} />
      <div className="flex flex-col justify-baseline items-baseline w-full max-w-3xl">
        <ul>
          {tweets.map((tweet, index) => (
            <li key={index}>{tweet}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
