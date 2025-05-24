import { create } from "zustand";

// This store is used to manage the idUpdatedMessage state
// component is used in the MessageBoard component

type IdUpdatedMessageStoreType = {
  id: string;
};
type IdUpdatedMessageStoreActions = {
  updateIdMessage: (id: string) => void;
  clearIdUpdatedMessage: () => void;
};

export const useIdUpdatedMessageStore = create<
  IdUpdatedMessageStoreType & IdUpdatedMessageStoreActions
>((set) => ({
  id: "",
  updateIdMessage: (id: string) =>
    set(() => ({
      id: id,
    })),
  clearIdUpdatedMessage: () => set({ id: "" }),
}));
