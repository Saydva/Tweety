import { useTweetStore } from "../store/tweet.sore";
import { useAddTweet } from "./handlers/handleAddTweet";

const AddTweet = () => {
  const { tweetValue, setTweetValue } = useTweetStore();
  const { addTweet } = useAddTweet();
  return (
    <div className="flex flex-row justify-between mt-3">
      <input
        value={tweetValue}
        onChange={(e) => setTweetValue(e.target.value)}
        type="text"
        placeholder="Type here"
        className="input"
      />
      <button onClick={addTweet} className="btn">
        Add
      </button>
    </div>
  );
};

export default AddTweet;
