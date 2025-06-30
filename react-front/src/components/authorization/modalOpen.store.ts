import { create } from "zustand";

type ModalStoreProps = {
  modalLoginOpen: boolean;
  modadSignUpOpen: boolean;
  logoutOpen: boolean;
};

type ModalStoreActions = {
  setLoginOpen: (setting: boolean) => void;
  setSignUpOpen: (setting: boolean) => void;
  setLogoutOpen: (setting: boolean) => void;
};

export const useModalOpenStore = create<ModalStoreProps & ModalStoreActions>(
  (set) => ({
    modadSignUpOpen: false,
    modalLoginOpen: false,
    logoutOpen: false,
    setLogoutOpen: (setting: boolean) => set(() => ({ logoutOpen: setting })),
    setLoginOpen: (setting: boolean) =>
      set(() => ({ modalLoginOpen: setting })),
    setSignUpOpen: (setting: boolean) =>
      set(() => ({ modadSignUpOpen: setting })),
  })
);
