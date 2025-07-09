import { create } from "zustand";

type InputProps = {
  name: string;
  email: string;
  password: string;
};

type InputActions = {
  setName: (name: string) => void;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  clearInputs: () => void;
};

export const useInputStore = create<InputProps & InputActions>((set) => ({
  name: "",
  email: "",
  password: "",

  setName: (name) => set({ name }),
  setEmail: (email) => set({ email }),
  setPassword: (password) => set({ password }),
  clearInputs: () => set({ name: "", email: "", password: "" }),
}));
