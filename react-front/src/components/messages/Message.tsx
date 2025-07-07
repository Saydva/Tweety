import { useAxios } from "../../utilities/axiosHandlers/axios";
import AddComment from "../comments/AddComment";
import { ThumbsUp, XSquare } from "react-feather";
import { Twitter } from "react-feather";
import CommentList from "../comments/CommentList";
import type { MessageProps } from "../../utilities/types/myTypes";

const Message = ({ message }: MessageProps) => {
  const DeleteMessage = useAxios.deleteMessage;
  const { owner, date, likes, _id, content, comments } = message;

  function ThumbsUpHandler({ _id, likes }: { _id: string; likes: number }) {
    const { sendLikes, getTweets } = useAxios;
    sendLikes(_id, likes);
    getTweets();
  }

  return (
    <div className="p-2 border-b border-gray-200">
      <div className="chat chat-start flex flex-row w-full justify-between items-start">
        <div className="flex flex-col">
          <div className="flex flex-row">
            <Twitter />
            <p className="text-xs">---{owner}</p>
          </div>

          <div className="chat-bubble chat-bubble-primary m-3">{content}</div>
          <div className="chat-footer "> {date.slice(0, 25)}</div>
        </div>
        <div className="buttons flex flex-col gap-2">
          <div className="flex flex-row justify-between gap-1">
            <ThumbsUp
              className="bg-info cursor-pointer rounded-sm p-1"
              onClick={() => ThumbsUpHandler({ likes, _id })}
            />
            <span className="text-xs text-base-content">{likes}</span>
            <AddComment id={_id} />
            <XSquare
              className="bg-error cursor-pointer rounded-sm p-1"
              onClick={() => DeleteMessage(_id)}
            />
          </div>
        </div>
      </div>
      <CommentList array={comments} />
    </div>
  );
};

export default Message;
