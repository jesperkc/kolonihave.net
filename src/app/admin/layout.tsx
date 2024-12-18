import { ForumContextProvider } from "../context/ForumContext";
import { UsersContextProvider } from "../context/UserContext";

export const revalidate = 360;

export default function ForumLayout({ children }) {
  return (
    <div className="admin-wrapper">
      <UsersContextProvider>
        <ForumContextProvider>{children}</ForumContextProvider>
      </UsersContextProvider>
    </div>
  );
}
