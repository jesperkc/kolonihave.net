import { Timestamp } from "firebase/firestore";

export type TForum = {
  id: string;
  name: string;
  slug: string;
  createdAt?:
    | Timestamp
    | {
        nanoseconds: number;
        seconds: number;
      };
};

export type TForumSnippet = {
  forumId: string;
  isModerator?: boolean;
  imageURL?: string;
};
