//ui for displaying a list of messages

import { MessageSquare } from "react-feather";
import CommentList from "../comments/commentList";

type ListContainerProps = {
  // Define any props you need here
  content: string;
  axiosFunctions: () => void;
  date: string;
  elId: string;
  comments?: {
    content: string;
    date: string;
  }[];
};

const ListContainer = (ListContainerProps: ListContainerProps) => {
  return (
    <div className="flex flex-row justify-between">
      <div className="flex flex-row rounded-lg p-2 m-2">
        <li className="list-none  ">
          <div className="card bg-base-100 shadow-sm flex flex-row ">
            <p className="min-w-25">User texted: &nbsp; &nbsp; &nbsp;</p>
            <p>{ListContainerProps.content}</p>
          </div>
          <div className="justify-end card-actions"></div>
          <div className="flex flex-row ">
            <p className="text-xs text-slate-400 self-center ">
              {ListContainerProps.date.slice(4, 21)}
            </p>
            <p className="text-xs text-slate-400 self-end mt-1"></p>
          </div>

          <ul>
            <CommentList
              comments={ListContainerProps.comments ?? []}
              id={ListContainerProps.elId}
            />
          </ul>
        </li>
      </div>
      <div className="flex flex-row justify-between h-min">
        <button
          className="hover:bg-slate-600 rounded-full p-1"
          onClick={() =>
            (
              document.getElementById("my_modal_1") as HTMLDialogElement | null
            )?.showModal()
          }
        >
          <MessageSquare />
        </button>
        <button
          onClick={ListContainerProps.axiosFunctions}
          className="btn btn-sm btn-primary m-2 self-center"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ListContainer;
