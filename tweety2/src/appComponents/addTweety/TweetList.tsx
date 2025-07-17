import { useTweetStore } from "../store/tweet.sore";
import { useDeleteTweet } from "./handlers/handleDeleteTweet";

const TweetList = () => {
  const { tweetList } = useTweetStore();
  const { deleteTweet } = useDeleteTweet();
  const itemList = tweetList.map((tweet, index) => (
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
