import Comment from "./Comment";
import type { CommentsListProps } from "../../utilities/types/myTypes";

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
