type AddTweetProps = {
  value: string;
  setValue: (value: string) => void;
  addTweet: () => void;
  deleteTweet: (index: number) => void;
};

const AddTweet = ({
  value,
  setValue,
  addTweet,
}: AddTweetProps & { addTweet: () => void }) => {
  return (
    <div className="flex flex-row justify-between mt-3">
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
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
