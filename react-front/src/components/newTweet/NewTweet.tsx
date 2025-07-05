import { useNewTweetStore } from "./NewTweet.store";
import { useMessagesStore } from "./messages.store";
import { useSignUp } from "../authorization/signUp.store";
import { useAxios } from "../../utilities/axios";

// component for new message

const NewTweet = () => {
  const loggedInUser = useSignUp((state) => state.isLoged);
  const InputStore = useNewTweetStore((state) => state);
  const MessagesStore = useMessagesStore((state) => state);

  // const sendTweets = useHandlerFunctions.SendTweets();
  function sendTweetHandler() {
    useAxios.sendTweets();
    useAxios.getTweets();
    InputStore.clearInputValue();
    MessagesStore.clearError();
  }

  return (
    <div>
      <p className={`text-error ${loggedInUser ? " hidden " : ""}`}>
        LoggIn first please!
      </p>
      <fieldset className="fieldset flex flexrow">
        <textarea
          value={InputStore.inputValue}
          onChange={(e) => InputStore.setInputValue(e.target.value)}
          className="textarea "
          placeholder={
            MessagesStore.error ? MessagesStore.error : "Type your message"
          }
        ></textarea>
        <button
          className={`btn border-cyan-800 ${loggedInUser ? "" : " hidden "}`}
          onClick={() => {
            if (InputStore.inputValue.trim() === "") {
              alert("Please enter a message");
              return;
            } else {
              sendTweetHandler();
            }
          }}
        >
          send
        </button>
      </fieldset>
    </div>
  );
};

export default NewTweet;
