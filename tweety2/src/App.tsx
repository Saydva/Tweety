import { useEffect, useState } from "react";
import AddTweety from "./appComponents/AddTweety";

function App() {
  const [value, setValue] = useState("");
  const [tweetyList, setTweetyList] = useState<string[]>(() => {
    const storedTweetyList = localStorage.getItem("tweetyList");
    return storedTweetyList ? JSON.parse(storedTweetyList) : [];
  });

  useEffect(() => {
    localStorage.setItem("tweetyList", JSON.stringify(tweetyList));
  }, [tweetyList]);

  const addTweety = () => {
    if (value.trim()) {
      setTweetyList([...tweetyList, value]);
      setValue("");
    }
  };

  const tweetyDelete = (index: number) => {
    setTweetyList(tweetyList.filter((_, i) => i !== index));
  };

  const itemList = tweetyList.map((tweety, index) => (
    <div key={index} className="tweety-item flex justify-between items-center ">
      <span>{tweety}</span>
      <button onClick={() => tweetyDelete(index)} className="btn">
        Delete
      </button>
    </div>
  ));
  console.log("Current Tweety List:", tweetyList);

  return (
    <div className="App flex flex-col h-screen w-xl mx-auto">
      <AddTweety
        value={value}
        setValue={setValue}
        addTweety={addTweety}
        deleteTweety={tweetyDelete}
      />
      <ul className="flex flex-col gap-2 mt-4">{itemList}</ul>
    </div>
  );
}

export default App;
