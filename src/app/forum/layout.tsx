import { ForumContextProvider } from "../context/ForumContext";

export default function ForumLayout({ children }) {
  return (
    <div className="forum-wrapper">
      <ForumContextProvider>{children}</ForumContextProvider>
    </div>
  );
}
