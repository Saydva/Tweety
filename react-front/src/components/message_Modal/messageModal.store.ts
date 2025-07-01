import { create } from "zustand";

type MessageProps = {
  isOpen: boolean;
  message: string;
  error: null | string[];
};

type MessageActions = {
  setMessage: (message: string) => void;
  setIsOpen: (isOpen: boolean) => void;
  setError: (error: string[] | null) => void;
  clearMessage: () => void;
  clearError: () => void;
};

export const useMessageModalStore = create<MessageProps & MessageActions>(
  (set) => ({
    isOpen: false,
    message: "",
    error: ["yes"],
    setMessage: (message: string) => set({ message }),
    setIsOpen: (isOpen: boolean) => set({ isOpen }),
    setError: (error: string[] | null) => set({ error }),
    clearMessage: () => set({ message: "" }),
    clearError: () => set({ error: null }),
  })
);
