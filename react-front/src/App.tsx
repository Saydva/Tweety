import { useEffect } from "react";
import { useMessagesStore } from "./components/newTweet/messages.store";
import { useAxios } from "./utilities/axios";
import Navbar from "./components/navbar/navbar";
import NewTweet from "./components/newTweet/NewTweet";
import MessagesList from "./components/messages/MessagesList";
import SignupPage from "./components/authorization/SignupModal";
import MessageModal from "./components/message_Modal/messageModal";
import LoginPage from "./components/authorization/LoginModal";
import LogoutModal from "./components/authorization/LogoutModal";

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
      {/* <LoginPage /> */}
      <SignupPage />
      <MessageModal />
      <LoginPage />
      <LogoutModal />
    </div>
  );
}

export default App;
