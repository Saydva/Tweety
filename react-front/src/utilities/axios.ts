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
    axiosGet();
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

type CommentType = {
  content: string;
  date: string;
};
// Function to send a comment to the server

const updateTweetyComments = async (id: string, data: CommentType) => {
  try {
    const tweetToUpdate = await axios.get(`http://localhost:5000/tweety/${id}`);
    const updatedComments = [
      ...tweetToUpdate.data.comments,
      { content: data.content, date: data.date },
    ];
    console.log(updatedComments);
    await axios.put(`http://localhost:5000/tweety/${id}`, {
      comments: updatedComments,
    });
    axiosGet();
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

type SendNewCommentsType = CommentType[];

const sendNewCommentList = async (
  id: string,
  newComments: SendNewCommentsType
) => {
  try {
    await axios.put(`http://localhost:5000/tweety/${id}`, {
      comments: newComments,
    });
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

// Function to check if the input contains only spaces
// and set an error message if it does
// This function uses a regular expression to check if the input contains only spaces
function useRegex(input: string) {
  // Regex to check if the input contains only spaces
  let regex = / \s*$/;
  return regex.test(input);
}

export const useAxios = {
  getTweets: () => {
    axiosGet();
  },
  getTwety: (id: string) => {
    axios.get(`http://localhost:5000/tweety/${id}`);
  },
  // Function to send a message
  sendTweets: () => {
    if (useRegex(useInputStore.getState().inputValue)) {
      useInputStore.getState().clearInputValue();
      useMessagesStore.getState().setError("Please enter a message");
      return;
    } else {
      axiosPost({
        content: useInputStore.getState().inputValue,
        date: new Date().toString(),
      });
      useInputStore.getState().clearInputValue();
    }
    useMessagesStore.getState().setError(null);
  },
  // Function to delete a message by ID
  deleteMessage: (id: string) => {
    axiosDelete(id);
    useMessagesStore.getState().clearError();
    axiosGet();
  },
  // Function to send a comment to the server
  sendComment: (id: string, data: CommentType) => {
    updateTweetyComments(id, data);
    useMessagesStore.getState().clearError();
  },
  // // Function to update a comment by ID
  // updateTweetyComments: (id: string, data: CommentType) => {
  //   updateTweetyComments(id, data);
  //   useMessagesStore.getState().clearError();
  //   useMessagesStore.getState().setError(null);
  // },
  // Function to send a list of comments to the server
  sendCommentList: (id: string, updatedComments: SendNewCommentsType) => {
    sendNewCommentList(id, updatedComments);
    useMessagesStore.getState().clearError();
  },
};
