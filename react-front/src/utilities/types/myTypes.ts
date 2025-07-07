import type { CommentType } from "../../components/newTweet/messages.store";

// Type for the comment object
export type addCommentProps = {
  id: string;
};

// Type for the comment object
export type CommentProps = {
  comment: {
    id: string;
    content: string;
    date: string;
    owner: string;
  };
};

// Type for the comment object and the array of comments
export type ArrayProps = {
  array: CommentProps["comment"][];
};

// Type for the comment object
export type CommentsListProps = {
  array: CommentType[];
};

// Type for the message object
export type MessageProps = {
  message: {
    _id: string;
    content: string;
    date: string;
    likes: number;
    comments: CommentType[];
    owner: string;
  };
};
