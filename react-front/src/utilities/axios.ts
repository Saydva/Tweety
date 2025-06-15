import axios from "axios";
import { useMessagesStore } from "../components/newTweet/messages.store";
import { useNewTweetStore } from "../components/newTweet/NewTweet.store";
import { useIdUpdatedMessageStore } from "../components/comments/idUpatedMessage.sore";

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

// Function to delete a message by ID
// and update the messages store
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
// and update the messages store
// Define the type for the comment data
type CommentType = {
  id: string;
  content: string;
  date: string;
};

// Function to send a comment to the server
// and update the comments of the tweet
const updateTweetyComments = async (data: CommentType) => {
  try {
    const tweetToUpdate = await axios.get(
      `http://localhost:5000/tweety/${useIdUpdatedMessageStore.getState().id}`
    );
    const updatedComments = [
      ...tweetToUpdate.data.comments,
      { id: data.id, content: data.content, date: data.date },
    ];
    await axios.put(
      `http://localhost:5000/tweety/${useIdUpdatedMessageStore.getState().id}`,
      {
        comments: updatedComments,
      }
    );
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

// Define the type for the comments to be sent
// This type is used to send a list of new comments to the server
type SendNewCommentsType = CommentType[];

// Function to send a list of new comments to the server
// and update the comments of the tweet
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

// Function to send likes to the server
const sendLikes = async (id: string, likes: number) => {
  try {
    await axios.put(`http://localhost:5000/tweety/${id}`, {
      likes: likes + 1,
    });
    await axiosGet();
  } catch (error) {
    if (error instanceof Error) {
      useMessagesStore
        .getState()
        .setError((error as any).response.data.message);
      console.log(error);
    }
  }
};

const login = async (email: string, password: string) => {
  try {
    await axios.post(`http://localhost:5000/tweety/auth`, {
      email: email,
      password: password,
    });
  } catch (error) {
    console.log(error);
  }
};

// Export the useAxios object with methods for getting, sending, and deleting tweets
export const useAxios = {
  getTweets: () => {
    axiosGet();
  },
  getTwety: (id: string) => {
    axios.get(`http://localhost:5000/tweety/${id}`);
  },
  // Function to send a message
  sendTweets: () => {
    if (useRegex(useNewTweetStore.getState().inputValue)) {
      useNewTweetStore.getState().clearInputValue();
      useMessagesStore.getState().setError("Please enter a message");
      return;
    } else {
      axiosPost({
        content: useNewTweetStore.getState().inputValue,
        date: new Date().toString(),
        likes: 0,
      });
      useNewTweetStore.getState().clearInputValue();
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
  sendComment: (data: CommentType) => {
    updateTweetyComments(data);
    useMessagesStore.getState().clearError();
  },
  sendNewCommentList: (id: string, newComments: SendNewCommentsType) => {
    sendNewCommentList(id, newComments);
  },
  sendLikes: (id: string, likes: number) => {
    sendLikes(id, likes);
  },
  //auth axios functions
  sendLogin: (email: string, password: string) => {
    login(email, password);
  },
};
