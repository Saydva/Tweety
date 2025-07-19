import { useEffect } from "react";
import HomeComp from "./home/HomeComp";
import { useLocalStorage } from "./store/tweetStorageUtils";

function App() {
  const { loadTweetsFromLS } = useLocalStorage();

  useEffect(() => {
    loadTweetsFromLS();
  }, []);

  return (
    <div className="App flex flex-col h-screen w-xl mx-auto">
      <HomeComp />
    </div>
  );
}

export default App;
