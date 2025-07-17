import { useEffect, useState } from "react";
import AddTweet from "./appComponents/addTweety/AddTweet";

function App() {
  const [value, setValue] = useState("");
  const [tweetList, setTweetList] = useState<string[]>(() => {
    const storedTweetList = localStorage.getItem("tweetyList");
    return storedTweetList ? JSON.parse(storedTweetList) : [];
  });

  useEffect(() => {
    localStorage.setItem("tweetyList", JSON.stringify(tweetList));
  }, [tweetList]);

  const addTweet = () => {
    if (value.trim()) {
      setTweetList([...tweetList, value]);
      setValue("");
    }
  };

  const tweetyDelete = (index: number) => {
    setTweetList(tweetList.filter((_, i) => i !== index));
  };

  const itemList = tweetList.map((tweet, index) => (
    <div key={index} className="tweety-item flex justify-between items-center ">
      <span>{tweet}</span>
      <button onClick={() => tweetyDelete(index)} className="btn">
        Delete
      </button>
    </div>
  ));
  console.log("Current Tweety List:", tweetList);

  return (
    <div className="App flex flex-col h-screen w-xl mx-auto">
      <AddTweet
        value={value}
        setValue={setValue}
        addTweet={addTweet}
        deleteTweet={tweetyDelete}
      />
      <ul className="flex flex-col gap-2 mt-4">{itemList}</ul>
    </div>
  );
}

export default App;
