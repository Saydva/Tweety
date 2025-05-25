import { useInputStore } from "../../store/input.store";
import { useMessagesStore } from "../../store/messages.store";
import { useAxios } from "../../utilities/axios";

// component to input a new message

const Input = () => {
  const InputStore = useInputStore((state) => state);
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

export default Input;
