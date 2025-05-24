import Navbar from "./components/navbar/navbar";
import Input from "./components/input/input";
import { useAxios } from "./utilities/axios";
import { useEffect } from "react";
import Messages from "./components/messages/Messages";
import { useMessagesStore } from "./store/messages.store";

function App() {
  useEffect(() => {
    useAxios.getTweets();
  });

  const array = useMessagesStore((state) => state.messages);

  return (
    <div className="m-auto w-1/2 min-w-96">
      <Navbar />
      <div className="flex flex-col gap-4 ">
        <Input />
        <div>
          <Messages array={array} />
        </div>
      </div>
    </div>
  );
}

export default App;
