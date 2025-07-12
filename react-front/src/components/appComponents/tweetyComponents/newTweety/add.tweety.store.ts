import { create } from "zustand";

export type TweetyProps = {
  userId: string;
  content: string;
  date: string;
  comments: object[];
  likes: number;
  owner: string;
  myLike: boolean;
};

type TweetyActions = {
  setUserId: (userId: string) => void;
  setContent: (content: string) => void;
  setDate: (date: string) => void;
  setComments: (comments: object[]) => void;
  setLikes: (likes: number) => void;
  setOwner: (owner: string) => void;
  setMyLike: (myLike: boolean) => void;
};

export const useTweetStore = create<TweetyActions & TweetyProps>((set) => ({
  userId: "",
  content: "",
  date: "",
  comments: [],
  likes: 0,
  owner: "",
  myLike: false,

  setUserId: (userId) => set({ userId }),
  setContent: (content) => set({ content }),
  setDate: (date) => set({ date }),
  setComments: (comments) => set({ comments }),
  setLikes: (likes) => set({ likes }),
  setOwner: (owner) => set({ owner }),
  setMyLike: (myLike) => set({ myLike }),
}));
