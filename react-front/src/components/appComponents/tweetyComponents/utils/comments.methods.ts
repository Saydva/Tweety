import axios from "axios";
import type { CommentProps } from "../newComment/addComment.sore";

const apiComment = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:4000",
  headers: {
    "Content-Type": "application/json",
  },
});

const addCommentToTweety = async (
  accerssToken: string,
  tweetyId: string,
  comment: CommentProps
): Promise<CommentProps> => {
  apiComment.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${accerssToken}`;
  const response = await apiComment.post(
    `/tweety/${tweetyId}/comments`,
    comment
  );
  return response.data;
};

const removeCommentFromTweety = async (
  accerssToken: string,
  tweetyId: string,
  commentId: string
): Promise<void> => {
  apiComment.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${accerssToken}`;
  await apiComment.delete(`/tweety/${tweetyId}/comments/${commentId}`);
};

export const commentAPI = {
  addCommentToTweety,
  removeCommentFromTweety,
};
