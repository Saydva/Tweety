import { XSquare } from "react-feather";
import { useAxios } from "../../utilities/axios";

type CommentElement = {
  content: string;
  date: string;
};

type CommentListProps = {
  comments: CommentElement[];
};

type IdType = {
  id: string;
};

const CommentList = ({ comments, id }: CommentListProps & IdType) => {
  const list = comments.map((comment, index) => (
    <li
      key={index}
      className="list-none border-2 border-slate-600 rounded-lg p-2 m-2"
    >
      <div className="flex flex-row justify-between gap-3">
        <div>
          <p>{comment.content}</p>
          <p className="textarea-xs p-2">{comment.date}</p>
        </div>
        <button
          onClick={() => {
            const newComments = comments.filter((e) => e.date !== comment.date);
            useAxios.sendCommentList(id, newComments);

            console.log(newComments);
          }}
          className="hover:bg-slate-600 rounded-full p-1 h-min"
        >
          <XSquare />
        </button>
      </div>
    </li>
  ));

  return <div className="flex flex-col">{list}</div>;
};

export default CommentList;
