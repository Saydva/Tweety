import { commentAPI } from "./comments.methods";
import { useAddCommentStore } from "../newComment/addComment.sore";
import type { CommentProps } from "../newComment/addComment.sore";
import { useAuthStore } from "../../../../stores/auth/auth.store";
import { useNavigate } from "react-router";
import { v4 as uuid } from "uuid";
import { useTweetyActions } from "./useTweety.Actions";

export const useCommentActions = () => {
  const { addCommentToTweety } = commentAPI;
  const { content, resetContent } = useAddCommentStore();
  const { accessToken, user } = useAuthStore();
  const navigate = useNavigate();
  const { handleGetAll } = useTweetyActions();

  const sendComment = async (tweetyId: string) => {
    if (!content) {
      alert("Comment content cannot be empty");
    }

    if (!accessToken) {
      throw new Error("You are not loged in");
    }

    const comment: CommentProps = {
      _id: uuid(),
      content,
      date: new Date().toISOString(),
      owner: user || "",
    };

    try {
      const response = await addCommentToTweety(accessToken, tweetyId, comment);
      navigate("/");
      handleGetAll(); // Refresh the tweet list after adding a comment
      resetContent(); // Reset the content after sending the comment
      return response;
    } catch (error) {
      console.error("Error adding comment:", error);
      throw error;
    }
  };

  const removeComment = async (tweetyId: string, commentId: string) => {
    if (!accessToken) {
      throw new Error("You are not logged in");
    }
    try {
      const response = await commentAPI.removeCommentFromTweety(
        accessToken,
        tweetyId,
        commentId
      );

      handleGetAll(); // Refresh the tweet list after removing a comment
      return response;
    } catch (error) {
      console.error("Error removing comment:", error);
      throw error;
    }
  };

  return {
    sendComment,
    resetContent,
    removeComment,
  };
};
