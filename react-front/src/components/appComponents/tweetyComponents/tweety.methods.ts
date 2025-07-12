import axios from "axios";
import type { TweetyProps } from "./newTweety/add.tweety.store";

const apiTweet = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:4000",
  headers: {
    "Content-Type": "application/json",
  },
});

const sendMessage = async (data: TweetyProps, accessToken: string) => {
  if (!accessToken) {
    throw new Error("Access token is required for sending messages.");
  }
  apiTweet.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
  const response = await apiTweet.post(`/tweety`, data);
  return response.data;
};

const getAllTweets = async (accessToken: string) => {
  apiTweet.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
  const response = await apiTweet.get(`/tweety`);
  return response.data;
};

export const messageAPI = {
  sendMessage,
  getAllTweets,
};
