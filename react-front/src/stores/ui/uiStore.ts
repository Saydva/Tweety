import { create } from "zustand";

type Theme = "light" | "dark";

type UiProps = {
  navbarOpen: boolean;
  theme: Theme;
};

type UiActions = {
  toggleNavbar: (boolean: boolean) => void;
  changeTheme: (theme: Theme) => void;
};

export const useUIStore = create<UiProps & UiActions>((set) => ({
  navbarOpen: false,
  theme: "light",
  toggleNavbar: (boolean: boolean) => set(() => ({ navbarOpen: boolean })),
  changeTheme: (theme: Theme) => {
    set(() => ({ theme }));
    // document.documentElement.setAttribute("data-theme", theme);
  },
}));
