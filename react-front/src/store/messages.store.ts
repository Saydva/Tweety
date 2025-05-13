import { create } from "zustand";

type Element = {
  content: string;
  _id: string;
};

export type MessagesStoreType = {
  messages: Element[];
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
