import { MessageSquare } from "react-feather";
import { useAxios } from "../../utilities/axios";

type ListProps = {
  name: string;
  date: string;
  elId: string;
};

// Ui for list of messages
// This component is used in the MessageBoard component

const List = ({ name, date, elId }: ListProps) => {
  console.log(elId);
  return (
    <li className="list-none border-2 border-slate-600 rounded-lg p-2 m-2">
      <div className="card bg-base-100 shadow-sm flex flex-row">
        <p className="min-w-25">User texted: &nbsp; &nbsp; &nbsp;</p>
        <p>{name}</p>
      </div>
      <div className="justify-end card-actions">
        <button
          onClick={() => {
            useAxios.deleteMessage(elId);
            useAxios.getMessages();
          }}
          className="btn btn-sm btn-primary"
        >
          Delete
        </button>
      </div>
      <div className="flex flex-row justify-between">
        <p className="text-xs text-slate-400 self-end">{date.slice(4, 21)}</p>
        <p className="text-xs text-slate-400 self-end mt-1">
          <button className="btn btn-xs btn-ghost">
            <MessageSquare width={18} />
          </button>
        </p>
      </div>
    </li>
  );
};

export default List;
