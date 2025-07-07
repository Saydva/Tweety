import { useNewTweetStore } from "./NewTweet.store";
import { useMessagesStore } from "./messages.store";
import { useSignUp } from "../authorization/signUp.store";
import { useAxios } from "../../utilities/axiosHandlers/axios";

// component for new message

const NewTweet = () => {
  const loggedInUser = useSignUp((state) => state.isLoged);
  const { setInputValue, inputValue, clearInputValue } = useNewTweetStore(
    (state) => state
  );
  const { clearError, error } = useMessagesStore((state) => state);
  const { sendTweets, getTweets } = useAxios;

  // const sendTweets = useHandlerFunctions.SendTweets();
  function sendTweetHandler() {
    sendTweets();
    getTweets();
    clearInputValue();
    clearError();
  }

  return (
    <div>
      <p className={`text-error ${loggedInUser ? " hidden " : ""}`}>
        LoggIn first please!
      </p>
      <fieldset className="fieldset flex flexrow">
        <textarea
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="textarea "
          placeholder={error ? error : "Type your message"}
        ></textarea>
        <button
          className={`btn border-cyan-800 ${loggedInUser ? "" : " hidden "}`}
          onClick={() => {
            if (inputValue.trim() === "") {
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
