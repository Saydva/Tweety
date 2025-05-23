import { useNewCommentStore } from "../../store/newComment.store";
import { useAxios } from "../../utilities/axios";

type ListProps = {
  elId: string;
};

const CommentBoard = ({ elId }: ListProps) => {
  const date = new Date().toLocaleString();

  const useCommentStrore = useNewCommentStore((state) => state);

  return (
    <div>
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Comment tweety</h3>
          <p className="py-4">
            <textarea
              className="textarea textarea-bordered w-full h-24"
              placeholder="Type your comment here"
              value={useCommentStrore.newComment}
              onChange={(e) => useCommentStrore.setNewComment(e.target.value)}
            ></textarea>
          </p>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button
                onClick={async () => {
                  if (useCommentStrore.newComment === "") {
                    alert("Please enter a comment");
                    return;
                  }
                  useAxios.sendComment(elId, {
                    content: useCommentStrore.newComment,
                    date: date,
                  });
                  useCommentStrore.clearComment();
                }}
                className="btn"
              >
                Save
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default CommentBoard;
