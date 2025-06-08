import Navbar from "./components/navbar/navbar";
import NewTweet from "./components/newTweet/NewTweet";
import { useAxios } from "./utilities/axios";
import { useEffect } from "react";
import MessagesList from "./components/messages/MessagesList";
import { useMessagesStore } from "./utilities/messages.store";

function App() {
  useEffect(() => {
    useAxios.getTweets();
  }, []);

  const array = useMessagesStore((state) => state.messages);

  return (
    <div className="m-auto w-1/2 min-w-96">
      <Navbar />
      <div className="flex flex-col gap-4 ">
        <NewTweet />
        <div>
          <MessagesList array={array} />
        </div>
      </div>
    </div>
  );
}

export default App;
