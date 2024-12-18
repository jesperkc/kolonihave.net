import { atom } from "recoil";
import { TForum, TForumSnippet } from "../../types/forum.types";

export interface IForumState {
  mySnippets: TForumSnippet[];
  currentForum?: TForum;
  fetchedSnippets: boolean;
}

const initialState: IForumState = {
  mySnippets: [],
  fetchedSnippets: false,
};

const forumSnippetStateAtom = atom<IForumState>({
  key: "forumSnippetState",
  default: initialState,
});

export default forumSnippetStateAtom;
