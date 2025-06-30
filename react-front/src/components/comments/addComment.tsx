import { MessageSquare } from "react-feather";
import { useIdUpdatedMessageStore } from "./idUpatedMessage.store";
import { useAxios } from "../../utilities/axios";
import { useAddCommentStore } from "./addComment.store";

// this component is used to comment on a message
// component is used in the Messages component

type addCommentProps = {
  id: string;
};

const AddComment = ({ id }: addCommentProps) => {
  // this is used to get id of the message to be commented on
  const idToUpdate = useIdUpdatedMessageStore((state) => state.id);
  // this is used to update the state of id of the message to be commented on
  const updateIdMessage = useIdUpdatedMessageStore(
    (state) => state.updateIdMessage
  );
  // this is used to set the input value for the comment
  const handelComment = useAddCommentStore((state) => state);
  // this is used to send the comment to the server
  const sendComment = useAxios.sendComment;
  // this is used to get the input value for the comment
  function addCommentHandler() {
    if (handelComment.newComment.trim() === "") {
      alert("Please enter a comment");
    } else {
      sendComment({
        id: idToUpdate,
        content: handelComment.newComment,
        date: new Date().toString(),
      });
    }
    handelComment.setNewComment("");
  }

  return (
    <div>
      <MessageSquare
        className="cursor-pointer bg-info rounded-sm p-1"
        onClick={() => {
          updateIdMessage(id);
          (
            document.getElementById("my_modal_1") as HTMLDialogElement | null
          )?.showModal();
        }}
      />
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Comment tweety</h3>
          <input
            value={handelComment.newComment}
            onChange={(e) => {
              handelComment.setNewComment(e.target.value);
            }}
            placeholder="comment a tweety"
            className="py-4 input"
          />
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button onClick={() => addCommentHandler()} className="btn">
                Comment
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default AddComment;
