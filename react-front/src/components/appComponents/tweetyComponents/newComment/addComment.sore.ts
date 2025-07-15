import { create } from "zustand";

export type CommentProps = {
  tweetyId?: string;
  _id?: string;
  date?: string;
  content: string;
  owner?: string;
};

type AddCommentStore = {
  setTweetyId: (tweetyId: string) => void;
  setId: (_id: string) => void;
  setContent: (content: string) => void;
  resetContent: () => void;
};

export const useAddCommentStore = create<AddCommentStore & CommentProps>(
  (set) => ({
    tweetyId: "",
    _id: "",
    content: "",
    setTweetyId: (tweetyId) => set(() => ({ tweetyId })),
    setId: (_id) => set(() => ({ _id })),
    setContent: (content) => set(() => ({ content })),
    resetContent: () => set(() => ({ content: "" })),
  })
);
