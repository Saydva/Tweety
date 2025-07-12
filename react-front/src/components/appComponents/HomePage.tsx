import AddNewTweet from "./tweetyComponents/newTweety/AddNewTweet";

const HomePage = () => {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-4 p-4">
      <AddNewTweet />
    </div>
  );
};

export default HomePage;
