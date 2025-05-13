import { create } from "zustand";

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
