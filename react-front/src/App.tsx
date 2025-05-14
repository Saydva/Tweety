import Navbar from "./components/navbar/navbar";
import Input from "./components/input/input";
import MessageBoard from "./components/messages/MessageBoard";
import { useMessagesStore } from "./store/messages.store";
import { useEffect } from "react";
import { useAxios } from "./utilities/axios";

function App() {
  const messagesStore = useMessagesStore((state) => state);

  useEffect(() => {
    useAxios.getMessages();
  }, []);

  return (
    <>
      <Navbar />
      <div className="m-3">
        <Input />
        <div>
          Messages :
          <MessageBoard array={messagesStore.messages} />
        </div>
      </div>
    </>
  );
}

export default App;
