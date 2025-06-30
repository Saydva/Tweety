import type { CommentType } from "../newTweet/messages.store";
import Message from "./Message";

type ArrayTypeProps = {
  array: CommentType[];
};

const MessagesList = ({ array }: ArrayTypeProps) => {
  const MessagesList = array
    .map((message, index) => (
      <div key={index}>
        <Message message={message} />
      </div>
    ))
    .reverse(); // Reverse the order of messages
  return (
    <div>
      <ul>{MessagesList}</ul>
    </div>
  );
};

export default MessagesList;
