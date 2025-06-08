import { create } from "zustand";

//store for managing input value
// This store is used to manage the input value for the message input field

type NewTweetStore = {
  inputValue: string;
};

type NewTweetActions = {
  setInputValue: (value: string) => void;
  clearInputValue: () => void;
};

export const useNewTweetStore = create<NewTweetStore & NewTweetActions>(
  (set) => ({
    inputValue: "",
    setInputValue: (value: string) => set({ inputValue: value }),
    clearInputValue: () => set({ inputValue: "" }),
  })
);
