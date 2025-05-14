type ListProps = {
  name: string;
};

const List = ({ name }: ListProps) => {
  return (
    <li className="list-none border-2 border-base-content rounded-lg p-2 m-2">
      <div className="card bg-base-100 shadow-sm flex flex-row">
        <p className="min-w-25">User texted: &nbsp; &nbsp; &nbsp;</p>
        <p>{name}</p>
      </div>
      <div className="justify-end card-actions">
        <button className="btn btn-sm btn-primary">Delete</button>
      </div>
    </li>
  );
};

export default List;
