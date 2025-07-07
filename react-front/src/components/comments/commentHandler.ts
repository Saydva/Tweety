import { useSignUp } from "../authorization/signUp.store";
import { useAddCommentStore } from "./addComment.store";
import { useIdUpdatedMessageStore } from "./idUpatedMessage.store";
import { useAxios } from "../../utilities/axiosHandlers/axios";
import type { CommentProps, ArrayProps } from "../../utilities/types/myTypes";

export function useAddCommentHandler() {
  const { idMessage } = useIdUpdatedMessageStore((state) => state);
  const { newComment, setNewComment } = useAddCommentStore((state) => state);
  const { user } = useSignUp((state) => state);
  const { setModalOpen } = useAddCommentStore((state) => state);
  const { sendComment } = useAxios;

  function addCommentHandler() {
    if (newComment.trim() === "") {
      alert("Please enter a comment");
    } else {
      sendComment({
        id: idMessage,
        content: newComment,
        date: new Date().toString(),
        owner: user,
      });
      setModalOpen(false);
    }
    setNewComment("");
  }

  return { addCommentHandler };
}

export function commentList({ comment, array }: CommentProps & ArrayProps) {
  useAxios.sendNewCommentList(
    comment.id,
    array.filter((c) => c.content !== comment.content)
  );
  useAxios.getTweets();
}
