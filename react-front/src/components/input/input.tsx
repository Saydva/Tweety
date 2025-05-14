import { useInputStore } from "../../store/input.store";
import { useMessagesStore } from "../../store/messages.store";
import { useAxios } from "../../utilities/axios";

const Input = () => {
  const InputStore = useInputStore((state) => state);
  const MessagesStore = useMessagesStore((state) => state);

  return (
    <div>
      <fieldset className="fieldset">
        <legend className="fieldset-legend text-slate-400">Type message</legend>
        <div className="flex flex-row gap-1">
          <input
            value={InputStore.inputValue}
            onChange={(e) => InputStore.setInputValue(e.target.value)}
            type="text"
            className="input"
            placeholder={
              MessagesStore.error ? MessagesStore.error : "Type your message"
            }
          />
          <button
            className="btn border-cyan-800"
            onClick={() => {
              useAxios.sendMessage();
              useAxios.getMessages();
            }}
          >
            send
          </button>
        </div>
      </fieldset>
    </div>
  );
};

export default Input;
