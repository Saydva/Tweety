type AddTweetyProps = {
  value: string;
  setValue: (value: string) => void;
};

const AddTweety = ({
  value,
  setValue,
  addTweety,
}: AddTweetyProps & { addTweety: () => void }) => {
  return (
    <div className="flex flex-row justify-between h-screen mt-3">
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        type="text"
        placeholder="Type here"
        className="input"
      />
      <button onClick={addTweety} className="btn">
        Add
      </button>
    </div>
  );
};

export default AddTweety;
