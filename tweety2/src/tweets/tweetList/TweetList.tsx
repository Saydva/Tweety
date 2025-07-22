import { useTweetStore } from "../store/tweet.store";
import { useDeleteTweet } from "./handleDeleteTweet";

const TweetList = () => {
  const { tweetList } = useTweetStore();
  const { deleteTweet } = useDeleteTweet();

  const itemList = tweetList.map((tweet: string, index: number) => (
    <div key={index} className="tweety-item flex justify-between items-center ">
      <span>{tweet}</span>
      <button onClick={() => deleteTweet(index)} className="btn">
        Delete
      </button>
    </div>
  ));

  return <div>{itemList}</div>;
};

export default TweetList;
