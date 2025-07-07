import { Trash } from "react-feather";
import { MessageSquare } from "react-feather";
import { commentList } from "./commentHandler";
import type { CommentProps, ArrayProps } from "../../utilities/types/myTypes";

const Comment = ({ comment, array }: CommentProps & ArrayProps) => {
  return (
    <div className="p-2 border-b border-gray-200">
      <div className="flex justify-between items-start">
        <div className="flex flex-col">
          <div className="flex flex-row">
            <p className="text-xs">{comment.owner} ---</p>
            <MessageSquare />
          </div>

          <span className=" border-2 border-slate-500 p-1 text-xs rounded-md w-auto">
            {comment.content}
          </span>
          <span className="text-gray-500 chat-footer">
            {comment.date.slice(0, 25)}
          </span>
        </div>
        <Trash
          className="cursor-pointer bg-error rounded-sm p-1 min-w-6 m-1"
          onClick={() => commentList({ comment, array })}
        />
      </div>
    </div>
  );
};

export default Comment;
