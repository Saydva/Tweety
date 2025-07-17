import { useState } from "react";
import AddTweety from "./appComponents/AddTweety";

function App() {
  const [value, setValue] = useState("");
  return (
    <div className="App flex flex-col justify-center h-screen w-xl mx-auto">
      <AddTweety value={value} setValue={setValue} />
    </div>
  );
}

export default App;
