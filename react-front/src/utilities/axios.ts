import axios from "axios";
import { useMessagesStore } from "../store/messages.store";
import { useInputStore } from "../store/input.store";
// Define the AxiosActions object with axiosPost and axiosGet methods
// Function to send a message to the server
const axiosPost = async (data: object) => {
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
};
// Function to get messages from the server
// and update the messages store
const axiosGet = async () => {
  try {
    axios.get("http://localhost:5000/tweety").then(function (response) {
      useMessagesStore.getState().updateMesagges(response.data);
    });
  } catch (error) {
    console.log(error);
  }
};

const axiosDelete = async (id: string) => {
  try {
    await axios.delete(`http://localhost:5000/tweety/${id}`);
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
};
// Function to delete a message by ID

// Function to check if the input contains only spaces
// and set an error message if it does
// This function uses a regular expression to check if the input contains only spaces
function useRegex(input: string) {
  // Regex to check if the input contains only spaces
  let regex = / \s*$/;
  return regex.test(input);
}

export const useAxios = {
  // Function to send a message
  // and clear the input value
  sendMessage: () => {
    if (useRegex(useInputStore.getState().inputValue)) {
      useInputStore.getState().clearInputValue();
      useMessagesStore.getState().setError("Please enter a message");
      return;
    } else {
      axiosPost({
        content: useInputStore.getState().inputValue,
        date: new Date().toString(),
      })
        .then(() => useInputStore.getState().clearInputValue())
        .then(() => axiosGet());
    }
    useMessagesStore.getState().setError(null);
  },
  getMessages: () => {
    axiosGet();
  },
  deleteMessage: (id: string) => {
    axiosDelete(id)
      .then(() => useMessagesStore.getState().clearError())
      .then(() => axiosGet());
  },
};
