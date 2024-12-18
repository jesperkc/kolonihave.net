import { Timestamp } from "firebase/firestore";

export type TUser = {
  id: string;
  profile: TProfile;
  displayName: string;
  email: string;
  createdAt?:
    | Timestamp
    | {
        nanoseconds: number;
        seconds: number;
      };
};
export type TProfile = {
  id: string;
  displayName: string;
};
