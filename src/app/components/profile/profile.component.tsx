"use client";
import { TUser } from "../../../types/user.types";
import { useAuth } from "../../context/AuthContext";
import EditProfileComponent from "./edit-profile.component";

function ProfileComponent({ user, loading }: { user?: TUser; loading?: boolean }) {
  const { logOut } = useAuth();
  return (
    <div>
      {loading ? "loading" : ""}
      {user && user.profile ? <EditProfileComponent user={user} /> : ""}
      <button onClick={logOut}>Log ud</button>
    </div>
  );
}

export default ProfileComponent;
