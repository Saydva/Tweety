import { useAxios } from "../../utilities/axios";
import type { CommentType } from "../../store/messages.store";
import Comment from "../comments/Comment";
import CommentList from "../comments/commentList";
import { XCircle, XSquare } from "react-feather";

type ArrayTypeProps = {
  array: CommentType[];
};

const Messages = ({ array }: ArrayTypeProps) => {
  const DeleteMessage = useAxios.deleteMessage;

  const MessagesList = array.map((message, index) => (
    <div key={index} className="p-2 border-b border-gray-200">
      <div className="chat chat-start flex flex-row w-full justify-between items-start">
        <div className="flex flex-col">
          <div className="chat-bubble chat-bubble-primary">
            {message.content}
          </div>
          <div className="chat-footer "> {message.date.slice(0, 25)}</div>
        </div>
        <div className="buttons flex flex-row gap-2">
          <XSquare
            className="bg-error cursor-pointer rounded-sm p-1"
            onClick={() => message._id && DeleteMessage(message._id)}
          />
          <Comment id={message._id} />
        </div>
      </div>

      <CommentList array={message.comments} />
    </div>
  ));
  return (
    <div>
      <ul>{MessagesList}</ul>
    </div>
  );
};

export default Messages;
