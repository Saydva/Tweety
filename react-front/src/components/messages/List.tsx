import { useAxios } from "../../utilities/axios";
import CommentBoard from "../comments/commentBoard";
import ListContainer from "./ListContainer";

type ListProps = {
  content: string;
  date: string;
  elId: string;
  comments?: {
    content: string;
    date: string;
  }[];
};

// Ui for list of messages
// This component is used in the MessageBoard component

const List = ({ content, date, elId, comments }: ListProps) => {
  const axiosFunctions = () => {
    useAxios.deleteMessage(elId);
    useAxios.getTweets();
  };
  return (
    <div className="border-2 border-slate-600 rounded-lg p-2 m-2">
      {/* ListContainer is the UI for displaying a list of messages 
        It takes
      the content, axiosFunctions, date and elId as props */}
      <ListContainer
        content={content}
        axiosFunctions={axiosFunctions}
        date={date}
        elId={elId}
        comments={comments}
      />
      <CommentBoard elId={elId} />
      {/* CommentBoard is the UI for displaying a comment board 
      It takes the
      content, axiosFunctions, date and elId as props */}
    </div>
  );
};

export default List;
