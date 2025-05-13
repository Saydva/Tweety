import type { MessagesStoreType } from "../../store/messages.store";

type ArrayType = {
  array: MessagesStoreType["messages"];
};

const MessageBoard = ({ array }: ArrayType) => {
  const list = array.map((e) => <li key={e._id}>{e.content}</li>);
  return <div>{list}</div>;
};

export default MessageBoard;
