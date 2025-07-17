import { useEffect, useState } from "react";
import AddTweety from "./addTweet/AddTweety";

function App() {
  const [value, setValue] = useState("");
  const [tweets, setTweets] = useState<string[]>(() => {
    const savedTweets = localStorage.getItem("tweets");
    return savedTweets ? JSON.parse(savedTweets) : [];
  });

  useEffect(() => {
    localStorage.setItem("tweets", JSON.stringify(tweets));
  }, [tweets]);

  const handleDeleteTweet = (index: number) => {
    setTweets((prevTweets) => {
      const updatedTweets = [...prevTweets];
      updatedTweets.splice(index, 1);
      return updatedTweets;
    });
  };

  return (
    <div className="App flex flex-col items-baseline justify-center min-h-screen gap-2 w-xl mx-auto">
      <AddTweety value={value} setValue={setValue} setTweets={setTweets} />
      <div className="flex flex-col justify-baseline items-baseline w-full max-w-3xl">
        <ul className="flex flex-col items-baseline justify-center w-full max-w-3xl">
          {tweets.map((tweet, index) => (
            <li
              key={index}
              className="flex items-center justify-between p-2 mb-2 rounded shadow w-full"
            >
              {tweet}
              <button className="btn " onClick={() => handleDeleteTweet(index)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
