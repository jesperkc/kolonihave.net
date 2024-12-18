import { useEffect } from "react";
import { serversideAuth } from "../../../components/serverside-auth";
import { useAuth } from "../context/AuthContext";
import Link from "next/link";
import AdminHeader from "./admin-header";

function ProfileIndex(props) {
  return (
    <main className="forums">
      <AdminHeader title={"Admin"} breadcrumbs={null} />

      <ul>
        <li>
          <Link href={"/admin/forums"}>Fora</Link>
        </li>
        <li>
          <Link href={"/admin/users"}>Brugere</Link>
        </li>
      </ul>
    </main>
  );
}

export default ProfileIndex;
