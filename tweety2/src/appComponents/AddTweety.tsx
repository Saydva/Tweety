type AddTweetyProps = {
  value: string;
  setValue: (value: string) => void;
};

const AddTweety = ({ value, setValue }: AddTweetyProps) => {
  return (
    <div className="flex flex-row justify-between h-screen mt-3">
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        type="text"
        placeholder="Type here"
        className="input"
      />
      <button className="btn">Add</button>
    </div>
  );
};

export default AddTweety;
