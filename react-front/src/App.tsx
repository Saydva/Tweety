import Navbar from "./components/navbar/navbar";
import Input from "./components/input/input";
import MessageBoard from "./components/messages/MessageBoard";
import { useMessagesStore } from "./store/messages.store";
import { useEffect } from "react";
import { useAxios } from "./utilities/axios";

function App() {
  const messagesStore = useMessagesStore((state) => state);

  useEffect(() => {
    useAxios.getTweets();
  });

  return (
    <div className="m-auto w-1/2 min-w-96">
      <Navbar />
      <div className="flex flex-col gap-4 ">
        <Input />
        <div>
          Messages :
          <MessageBoard array={messagesStore.messages} />
        </div>
      </div>
    </div>
  );
}

export default App;
