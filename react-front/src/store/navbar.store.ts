import { create } from "zustand";

// Zustand store for managing input value state
// This store is used to manage the state of the navbar (open/closed)

type NavbarStore = {
  isClosed: boolean;
};

type NavbarStoreActions = {
  toggle: () => void;
};

export const useNavbarStore = create<NavbarStore & NavbarStoreActions>(
  (set) => ({
    isClosed: false,
    toggle: () => set((state) => ({ isClosed: !state.isClosed })),
  })
);
