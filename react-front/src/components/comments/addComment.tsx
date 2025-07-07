import { MessageSquare, XSquare } from "react-feather";
import { useIdUpdatedMessageStore } from "./idUpatedMessage.store";
import { useAddCommentStore } from "./addComment.store";
import { useAddCommentHandler } from "./commentHandler";
import type { addCommentProps } from "../../utilities/types/myTypes";

const AddComment = ({ id }: addCommentProps) => {
  const { updateIdMessage } = useIdUpdatedMessageStore((state) => state);
  const { newComment, setNewComment, modalOpen, setModalOpen } =
    useAddCommentStore((state) => state);
  const { addCommentHandler } = useAddCommentHandler();

  return (
    <div>
      <MessageSquare
        className="cursor-pointer bg-info rounded-sm p-1"
        onClick={() => {
          updateIdMessage(id);
          setModalOpen(true);
        }}
      />
      <dialog
        id="my_modal_1"
        className={`modal ${modalOpen ? "modal-open" : ""}`}
      >
        <div className="modal-box">
          <div className="flex flex-row justify-between">
            <h3 className="font-bold text-lg">Comment tweety</h3>
            <button className="btn" onClick={() => setModalOpen(false)}>
              <XSquare />
            </button>
          </div>
          <input
            value={newComment}
            onChange={(e) => {
              setNewComment(e.target.value);
            }}
            placeholder="comment a tweety"
            className="py-4 input"
          />
          <div className="modal-action">
            <form method="dialog">
              <button
                onClick={() => {
                  addCommentHandler();
                }}
                className="btn"
              >
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
