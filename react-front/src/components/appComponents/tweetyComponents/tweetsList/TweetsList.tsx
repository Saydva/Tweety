import { useTweetsListStore } from "./tweetsList.store";
import type { TweetyProps } from "../newTweety/addTweety.store";

import Tweety from "./Tweety";

const TweetsList = () => {
  const { tweets } = useTweetsListStore();

  const tweetItems = tweets.map((tweet: TweetyProps) => (
    <Tweety {...tweet} key={tweet._id} comments={tweet.comments} />
  ));

  return <div>{tweetItems}</div>;
};

export default TweetsList;
