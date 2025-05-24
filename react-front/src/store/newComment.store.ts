import { create } from "zustand";

// Zustand store for managing input value state
// this store is used for managing the new comment input field in the application

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
