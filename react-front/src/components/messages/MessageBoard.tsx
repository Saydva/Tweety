import type { MessagesStoreType } from "../../store/messages.store";
import List from "./List";

//Logic for the message board
// This component is used in the App component

type ArrayType = {
  array: MessagesStoreType["messages"];
};

const MessageBoard = ({ array }: ArrayType) => {
  const list = array
    .map((e) => (
      <List
        key={e._id}
        elId={e._id}
        content={e.content}
        date={e.date}
        comments={e.comments}
      />
    ))
    .reverse();
  return <div>{list}</div>;
};

export default MessageBoard;
