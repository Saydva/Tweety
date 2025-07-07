import { create } from "zustand";

// This store is used to manage the idUpdatedMessage state
// component is used in the MessageBoard component

type IdUpdatedMessageStoreType = {
  idMessage: string;
};
type IdUpdatedMessageStoreActions = {
  updateIdMessage: (id: string) => void;
  clearIdUpdatedMessage: () => void;
};

export const useIdUpdatedMessageStore = create<
  IdUpdatedMessageStoreType & IdUpdatedMessageStoreActions
>((set) => ({
  idMessage: "",
  updateIdMessage: (id: string) =>
    set(() => ({
      idMessage: id,
    })),
  clearIdUpdatedMessage: () => set({ idMessage: "" }),
}));
