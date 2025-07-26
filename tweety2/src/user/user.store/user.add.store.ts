import { create } from "zustand";

export type UserInputProps = {
  name?: string;
  email: string;
  password: string;
};

type UserInputActions = {
  setName: (name: string) => void;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  resetInput: () => void;
};

export const useUserInputStore = create<UserInputProps & UserInputActions>(
  (set) => ({
    name: "",
    email: "",
    password: "",

    setName: (name) => set({ name }),
    setEmail: (email) => set({ email }),
    setPassword: (password) => set({ password }),

    resetInput: () =>
      set({
        name: "",
        email: "",
        password: "",
      }),
  })
);
