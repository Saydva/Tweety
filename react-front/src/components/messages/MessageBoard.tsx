import type { MessagesStoreType } from "../../store/messages.store";
import List from "./list";

type ArrayType = {
  array: MessagesStoreType["messages"];
};

const MessageBoard = ({ array }: ArrayType) => {
  const list = array.map((e) => <List key={e._id} name={e.content} />);
  return <div>{list}</div>;
};

export default MessageBoard;
