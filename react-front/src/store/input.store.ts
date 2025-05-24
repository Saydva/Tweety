import { create } from "zustand";

//store for managing input value
// This store is used to manage the input value for the message input field

type InputStore = {
  inputValue: string;
};

type InputActions = {
  setInputValue: (value: string) => void;
  clearInputValue: () => void;
};

export const useInputStore = create<InputStore & InputActions>((set) => ({
  inputValue: "",
  setInputValue: (value: string) => set({ inputValue: value }),
  clearInputValue: () => set({ inputValue: "" }),
}));
