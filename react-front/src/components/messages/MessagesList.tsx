import type { CommentType } from "../../utilities/messages.store";
import Message from "./Message";

type ArrayTypeProps = {
  array: CommentType[];
};

const MessagesList = ({ array }: ArrayTypeProps) => {
  const MessagesList = array.map((message, index) => (
    <div key={index}>
      <Message message={message} />
    </div>
  ));
  return (
    <div>
      <ul>{MessagesList}</ul>
    </div>
  );
};

export default MessagesList;
