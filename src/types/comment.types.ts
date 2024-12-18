import { Timestamp } from "firebase/firestore";

export type TComment = {
  comment: string;
  createdAt: Timestamp;
  creatorId: string;
  creatorDisplayName: string;
  forumId: string;
  postId: string;
  id: string;
};
