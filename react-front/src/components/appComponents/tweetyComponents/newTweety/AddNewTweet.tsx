import { useTweetStore } from "./addTweety.store";
import { useTweetyActions } from "../utils/useTweety.Actions";

const AddNewTweet = () => {
  const { content, setContent } = useTweetStore();
  const { handleSendTweet } = useTweetyActions();

  return (
    <div className="flex w-96 flex-col gap-4">
      <input
        name="New Tweet"
        value={content}
        className="input resize-none overflow-hidden"
        onChange={(e) => setContent(e.target.value)}
      />
      <div className="flex justify-end">
        <button className="btn w-min" onClick={() => handleSendTweet()}>
          Send
        </button>
      </div>
    </div>
  );
};

export default AddNewTweet;
