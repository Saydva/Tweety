import { create } from "zustand";
import type { CommentProps } from "../newComment/addComment.sore";

export type TweetyProps = {
  _id?: string;
  content: string;
  date: string;
  comments: CommentProps[];
  likes: number;
  owner: string;
  myLike: boolean;
};

type TweetyActions = {
  // setId: (id: string) => void;
  setContent: (content: string) => void;
  resetContent: () => void;
  setDate: (date: string) => void;
  setComments: (comments: CommentProps[]) => void;
  setLikes: (likes: number) => void;
  setOwner: (owner: string) => void;
  setMyLike: (myLike: boolean) => void;
};

export const useTweetStore = create<TweetyActions & TweetyProps>((set) => ({
  _id: "",
  content: "",
  date: "",
  comments: [],
  likes: 0,
  owner: "",
  myLike: false,

  // setId: (id) => set({ id }),
  setContent: (content) => set({ content }),
  resetContent: () => set({ content: "" }),
  setDate: (date) => set({ date }),
  setComments: (comments) => set({ comments }),
  setLikes: (likes) => set({ likes }),
  setOwner: (owner) => set({ owner }),
  setMyLike: (myLike) => set({ myLike }),
}));
