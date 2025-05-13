import axios from "axios";
import { useMessagesStore } from "../store/messages.store";
export const AxiosActions = {
  AxiosPost: async (data: object) => {
    try {
      await axios.post("http://localhost:5000/tweety", data);
      useMessagesStore.getState().clearError();
      useMessagesStore.getState().setError(null);
    } catch (error) {
      if (error instanceof Error) {
        useMessagesStore
          .getState()
          .setError((error as any).response.data.message);
        console.log(error);
      }
    }
  },
  AxiosGet: async () => {
    try {
      axios.get("http://localhost:5000/tweety").then(function (response) {
        useMessagesStore.getState().updateMesagges(response.data);
      });
    } catch (error) {
      console.log(error);
    }
  },
};
