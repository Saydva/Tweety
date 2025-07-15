import { MinusSquare } from "react-feather";
import { useCommentActions } from "../utils/useComponents.Actions";
import type { CommentProps } from "../newComment/addComment.sore";

const CommentList = ({
  comments,
  tweetyId,
}: {
  comments: CommentProps[];
  tweetyId: string;
}) => {
  const { removeComment } = useCommentActions();

  const list = comments
    .filter((comment) => typeof comment._id === "string")
    .map((comment) => (
      <div
        className="comment-item flex justify-between flex-row"
        key={comment._id}
      >
        {comment.content}
        <MinusSquare
          onClick={() => removeComment(tweetyId, comment._id as string)}
        />
      </div>
    ));

  return <div>{list}</div>;
};

export default CommentList;
