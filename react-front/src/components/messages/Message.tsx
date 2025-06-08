import { useAxios } from "../../utilities/axios";
import AddComment from "../comments/addComment";
import CommentList from "../comments/CommentList";
import { ThumbsUp, XSquare } from "react-feather";
import type { CommentType } from "../../utilities/messages.store";

type MessageProps = {
  message: {
    _id: string;
    content: string;
    date: string;
    likes: number;
    comments: CommentType[];
  };
};

const Message = ({ message }: MessageProps) => {
  const DeleteMessage = useAxios.deleteMessage;
  return (
    <div className="p-2 border-b border-gray-200">
      <div className="chat chat-start flex flex-row w-full justify-between items-start">
        <div className="flex flex-col">
          <div className="chat-bubble chat-bubble-primary m-3">
            {message.content}
          </div>
          <div className="chat-footer "> {message.date.slice(0, 25)}</div>
        </div>
        <div className="buttons flex flex-row gap-2">
          <ThumbsUp
            className="bg-info cursor-pointer rounded-sm p-1"
            onClick={() => {
              useAxios.sendLikes(message._id, message.likes);
              useAxios.getTweets();
            }}
          />
          <span className="text-xs text-base-content">{message.likes}</span>
          <AddComment id={message._id} />
          <XSquare
            className="bg-error cursor-pointer rounded-sm p-1"
            onClick={() => message._id && DeleteMessage(message._id)}
          />
        </div>
      </div>

      <CommentList array={message.comments} />
    </div>
  );
};

export default Message;

{
  /*  */
}
