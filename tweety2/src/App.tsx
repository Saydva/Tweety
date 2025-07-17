import HomeComp from "./appComponents/home/HomeComp";
import { useLocalStorageHandler } from "./appComponents/home/useLocalStorageHandler";

function App() {
  const { isLLSEnabled } = useLocalStorageHandler();

  if (!isLLSEnabled) return null;

  return (
    <div className="App flex flex-col h-screen w-xl mx-auto">
      <HomeComp />
    </div>
  );
}

export default App;
