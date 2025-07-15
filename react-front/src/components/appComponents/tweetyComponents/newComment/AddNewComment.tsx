import { useAddCommentStore } from "./addComment.sore";
import { useCommentActions } from "../utils/useComponents.Actions";
const AddNewComment = () => {
  const { setContent, content, tweetyId } = useAddCommentStore();
  const { sendComment } = useCommentActions();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen tototuna w-full">
      <div className="card w-96 bg-base-100 card-md shadow-sm">
        <div className="card-body">
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Write your comment</legend>
            <input
              value={content}
              type="text"
              className="input"
              placeholder="Type here"
              onChange={(e) => setContent(e.target.value)}
            />
            <p className="label">Optional</p>
          </fieldset>
          <div className="justify-end card-actions">
            <button
              className="btn btn-primary"
              onClick={() => {
                sendComment(tweetyId ?? "");
              }}
            >
              Comment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddNewComment;
