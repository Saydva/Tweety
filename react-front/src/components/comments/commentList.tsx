import type { CommentType } from "../newTweet/messages.store";
import Comment from "./Comment";

type CommentsListProps = {
  array: CommentType[];
};

const CommentList = ({ array }: CommentsListProps) => {
  const CommentList = array.map((comment, index) => (
    <div key={index}>
      <Comment comment={comment} array={array} />
    </div>
  ));

  return (
    <div>
      <ul>{CommentList}</ul>
    </div>
  );
};

export default CommentList;
