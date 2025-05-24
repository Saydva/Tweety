import { create } from "zustand";

// Zustand store for managing input value state
// This store is used to manage the messages displayed in the application
export type CommentType = {
  comments: CommentType[];
  content: string;
  date: string;
  id: string;
  _id: string;
};

export type MessagesStoreType = {
  messages: CommentType[];
  error: null | string;
};

type MessagesStoreActions = {
  updateMesagges: (array: []) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
};

export const useMessagesStore = create<
  MessagesStoreType & MessagesStoreActions
>((set) => ({
  messages: [],
  error: null,
  updateMesagges: (array: []) => set({ messages: array }),
  setError: (error: string | null) => set({ error }),
  clearError: () => set({ error: null }),
}));
