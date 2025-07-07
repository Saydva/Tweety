import axios from "axios";
import { useMessagesStore } from "../../components/newTweet/messages.store";
import { useNewTweetStore } from "../../components/newTweet/NewTweet.store";
import { useIdUpdatedMessageStore } from "../../components/comments/idUpatedMessage.store";
import { useSignUp } from "../../components/authorization/signUp.store";
import { checkTokenValidity } from "../handlers/tokenHandler";

const PORT = import.meta.env.VITE_PORT || 3000;

// const accessToken = useSignUp.getState().accessToken ?? "";
// const refreshtoken = useSignUp.getState().refreshToken ?? "";

// Define the AxiosActions object with axiosPost and axiosGet methods
// Function to send a message to the server
const axiosPost = async (data: object) => {
  console.log(checkTokenValidity());
  try {
    await axios.post(`http://localhost:${PORT}/tweety`, data, {
      headers: {
        Authorization: "Bearer " + useSignUp.getState().accessToken,
      },
    });
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
    await axios
      .get(`http://localhost:${PORT}/tweety`, {
        headers: {
          Authorization: "Bearer " + useSignUp.getState().accessToken,
        },
      })
      .then(function (response) {
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
    await axios.delete(`http://localhost:${PORT}/tweety/${id}`, {
      headers: {
        Authorization: "Bearer " + useSignUp.getState().accessToken,
      },
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

// Function to delete a message by ID
// and update the messages store
// Define the type for the comment data
type CommentType = {
  id: string;
  content: string;
  date: string;
  owner: string;
};

// Function to send a comment to the server
// and update the comments of the tweet
const updateTweetyComments = async (data: CommentType) => {
  try {
    const tweetToUpdate = await axios.get(
      `http://localhost:${PORT}/tweety/${
        useIdUpdatedMessageStore.getState().idMessage
      }`,
      {
        headers: {
          Authorization: "Bearer " + useSignUp.getState().accessToken,
        },
      }
    );
    const updatedComments = [
      ...tweetToUpdate.data.comments,
      {
        id: data.id,
        content: data.content,
        date: data.date,
        owner: data.owner,
      },
    ];
    await axios.put(
      `http://localhost:${PORT}/tweety/${
        useIdUpdatedMessageStore.getState().idMessage
      }`,
      {
        comments: updatedComments,
      },
      {
        headers: {
          Authorization: "Bearer " + useSignUp.getState().accessToken,
        },
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
    await axios.put(
      `http://localhost:${PORT}/tweety/${id}`,
      {
        comments: newComments,
      },
      {
        headers: {
          Authorization: "Bearer " + useSignUp.getState().accessToken,
        },
      }
    );
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
    await axios.put(
      `http://localhost:${PORT}/tweety/${id}`,
      {
        likes: likes + 1,
      },
      {
        headers: {
          Authorization: "Bearer " + useSignUp.getState().accessToken,
        },
      }
    );
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
    await axios.post(`http://localhost:${PORT}/tweety/auth`, {
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
    axios.get(`http://localhost:${PORT}/tweety/${id}`);
  },
  // Function to send a message
  sendTweets: () => {
    let owner = useSignUp.getState().user;
    if (useRegex(useNewTweetStore.getState().inputValue)) {
      useNewTweetStore.getState().clearInputValue();
      useMessagesStore.getState().setError("Please enter a message");
      return;
    } else {
      axiosPost({
        content: useNewTweetStore.getState().inputValue,
        date: new Date().toString(),
        likes: 0,
        owner: owner,
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
