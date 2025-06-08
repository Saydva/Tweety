import { useNewTweetStore } from "./NewTweet.store";
import { useMessagesStore } from "../../utilities/messages.store";
import { useAxios } from "../../utilities/axios";

// component for new message

const NewTweet = () => {
  const InputStore = useNewTweetStore((state) => state);
  const MessagesStore = useMessagesStore((state) => state);

  return (
    <div>
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
          className="btn border-cyan-800"
          onClick={() => {
            if (InputStore.inputValue.trim() === "") {
              alert("Please enter a message");
              return;
            } else {
              useAxios.sendTweets();
              useAxios.getTweets();
              InputStore.clearInputValue();
              MessagesStore.clearError();
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
