type AddTweetyProps = {
  value: string;

  setValue: React.Dispatch<React.SetStateAction<string>>;
  setTweets: React.Dispatch<React.SetStateAction<string[]>>;
};

const AddTweety = ({ value, setValue, setTweets }: AddTweetyProps) => {
  const handleAddTweet = () => {
    if (value.trim()) {
      setTweets((prevTweets) => [...prevTweets, value]);
      setValue("");
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="neutral"
        className="input input-neutral"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button
        className="btn btn-primary m-3"
        onClick={handleAddTweet}
        disabled={!value.trim()}
      >
        Add Tweet
      </button>
    </div>
  );
};

export default AddTweety;
