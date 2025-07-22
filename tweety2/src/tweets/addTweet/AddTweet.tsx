import { useState } from "react";
import { useAddTweet } from "./handleAddTweet";

const AddTweet = () => {
  const [value, setValue] = useState("");
  const { addTweet } = useAddTweet();

  return (
    <div className="flex flex-row justify-between mt-3">
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        type="text"
        placeholder="Type here"
        className="input"
      />
      <button
        onClick={() => {
          addTweet(value);
          setValue("");
        }}
        className="btn"
      >
        Add
      </button>
    </div>
  );
};

export default AddTweet;
