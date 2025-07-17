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
      <li
        className="opacity-50 flex flex-row justify-between"
        key={comment._id}
      >
        <span className="badge badge-xs badge-base-100">
          {comment.owner}:{" " + comment.content}{" "}
        </span>
        <span></span>{" "}
        <MinusSquare
          onClick={() => removeComment(tweetyId, comment._id as string)}
        />
      </li>
    ));

  return <div>{list}</div>;
};

export default CommentList;
