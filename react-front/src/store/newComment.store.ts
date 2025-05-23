import { create } from "zustand";

interface NewCommentStore {
  newComment: string;
  setNewComment: (comment: string) => void;
  clearComment: () => void;
}

export const useNewCommentStore = create<NewCommentStore>((set) => ({
  newComment: "",
  setNewComment: (comment: string) => set({ newComment: comment }),
  clearComment: () => set({ newComment: "" }),
}));
