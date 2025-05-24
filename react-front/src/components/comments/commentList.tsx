import { Trash } from "react-feather";
import type { CommentType } from "../../store/messages.store";
import { useAxios } from "../../utilities/axios";

type CommentsListProps = {
  array: CommentType[];
};

const CommentList = ({ array }: CommentsListProps) => {
  const CommentList = array.map((comment, index) => (
    <div key={index} className="p-2 border-b border-gray-200">
      <div className="flex justify-between items-start">
        <div className="flex flex-col">
          <span className=" border-2 border-slate-500 p-1 text-xs rounded-md w-auto">
            {comment.content}
          </span>
          <span className="text-gray-500 chat-footer">
            {comment.date.slice(0, 25)}
          </span>
        </div>
        <Trash
          className="cursor-pointer bg-error rounded-sm p-1 min-w-6 m-1"
          onClick={() => {
            useAxios.sendNewCommentList(
              comment.id,
              array.filter((c) => c.content !== comment.content)
            );
          }}
        />
      </div>
    </div>
  ));

  return (
    <div>
      <ul>{CommentList}</ul>
    </div>
  );
};

export default CommentList;
