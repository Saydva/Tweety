import { MessageSquare, XSquare } from "react-feather";
import type { TweetyProps } from "../newTweety/addTweety.store";
import { useTweetyActions } from "../utils/useTweety.Actions";
import { Link } from "react-router";
import { useAddCommentStore } from "../newComment/addComment.sore";
import CommentList from "../commentList/CommentList";

const Tweety = (tweet: TweetyProps) => {
  const { _id, content, owner, date, comments } = tweet;
  const { setTweetyId, tweetyId } = useAddCommentStore();
  const { handleDeleteTweet } = useTweetyActions();

  return (
    <div>
      <li className="list-row" key={_id}>
        {_id && <span className="text-xs text-gray-400">{_id}</span>}
        <div className="flex flex-col">
          <span className="text-sm font-bold">{owner}</span>
          <span className="text-xs text-gray-500">{date}</span>
          <p className="text-base">{content}</p>
          <XSquare
            onClick={() => {
              if (_id) handleDeleteTweet(_id);
            }}
          />
          <Link
            to="AddNewComment"
            onClick={() => {
              setTweetyId(_id || "");
              console.log("Setting ID for comment:", tweetyId);
            }}
          >
            <MessageSquare />
          </Link>
          <CommentList comments={comments} tweetyId={tweetyId || ""} />
        </div>
      </li>
    </div>
  );
};

export default Tweety;
