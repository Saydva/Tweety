import { useAxios } from "../../utilities/axios";
import { Trash } from "react-feather";

type CommentProps = {
  comment: {
    id: string;
    content: string;
    date: string;
  };
};

type ArrayProps = {
  array: CommentProps["comment"][];
};

const Comment = ({
  comment,

  array,
}: CommentProps & ArrayProps) => {
  return (
    <div className="p-2 border-b border-gray-200">
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
            useAxios.getTweets();
          }}
        />
      </div>
    </div>
  );
};

export default Comment;

// import { useAxios } from "../../utilities/axios";
// import { Trash } from "react-feather";

{
  /* <div key={index} className="p-2 border-b border-gray-200">
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
            useAxios.getTweets();
          }}
        />
      </div>
    </div> */
}
