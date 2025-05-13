import { create } from "zustand";

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
