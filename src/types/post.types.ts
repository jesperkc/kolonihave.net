import type { Timestamp } from "firebase/firestore";
import { TComment } from "./comment.types";

export type TPost = {
  ID: string;
  forumId: string;
  creatorId: string;
  creatorDisplayName: string;
  title: string;
  description: string;
  slug: string;
  numberOfComments: number;
  mediaURL?: string;
  mediaType?: "image" | "video";
  communityImageURL?: string;
  createdAt: Timestamp;
};

export type TPostVote = {
  ID: string;
  postID: string;
  forumId: string;
  voteValue: -1 | 1;
};

export type IPostAndComments = {
  post: any;
  comments: TComment[];
};

export type TNewPost = Omit<TPost, "ID">;
