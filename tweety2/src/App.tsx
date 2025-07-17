import { useState } from "react";
import AddTweety from "./appComponents/AddTweety";

function App() {
  const [value, setValue] = useState("");
  const [tweetyList, setTweetyList] = useState<string[]>([]);

  const addTweety = () => {
    if (value.trim()) {
      setTweetyList([...tweetyList, value]);
      setValue("");
    }
  };

  console.log("Current Tweety List:", tweetyList);

  return (
    <div className="App flex flex-col justify-center h-screen w-xl mx-auto">
      <AddTweety value={value} setValue={setValue} addTweety={addTweety} />
    </div>
  );
}

export default App;
