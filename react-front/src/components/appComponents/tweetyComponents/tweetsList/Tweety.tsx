import { MessageSquare, XSquare } from "react-feather";
import type { TweetyProps } from "../newTweety/addTweety.store";
import { useTweetyActions } from "../utils/useTweety.Actions";
import { Link } from "react-router";
import { useAddCommentStore } from "../newComment/addComment.sore";
import CommentList from "../commentList/CommentList";

const Tweety = (tweet: TweetyProps) => {
  const { _id, content, owner, date, comments } = tweet;
  const { setTweetyId } = useAddCommentStore();
  const { handleDeleteTweet } = useTweetyActions();

  return (
    <div key={_id}>
      <div className="card w-96 bg-base-100 shadow-sm mb-2">
        <div className="card-body">
          <span className="badge badge-xs badge-base-100">{owner}</span>
          <div className="flex justify-between">
            <h2 className="text-xl font-bold">{content}</h2>
            <span className="text-xl flex flex-row">
              <Link
                to="AddNewComment"
                onClick={() => {
                  setTweetyId(_id || "");
                }}
              >
                <MessageSquare />
              </Link>
              <XSquare
                onClick={() => {
                  if (_id) handleDeleteTweet(_id);
                }}
              />
            </span>
          </div>
          <time className="text-xs opacity-50">{date.slice(0, 10)}</time>
          <ul className="flex flex-col gap-2 text-xs border-t-2 pt-2">
            <CommentList comments={comments} tweetyId={_id || ""} />
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Tweety;
