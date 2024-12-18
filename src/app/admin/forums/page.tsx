import { useEffect } from "react";
import { serversideAuth } from "../../../../components/serverside-auth";
import { getForums } from "../../functions/serverside/serverside-functions";
import { useAuth } from "../../context/AuthContext";
import Breadcrumbs from "../../components/breadcrumbs";
import ForumsAdminComponent from "./admin-forums.component";
import AdminHeader from "../admin-header";

async function ProfileIndex(props) {
  const forums = await getForums();
  const breadcrumbs = [
    {
      title: "Admin",
      slug: "admin",
    },
    {
      title: "Fora",
      slug: "forums",
    },
  ];
  return (
    <main className="forums">
      <AdminHeader title={"Fora"} breadcrumbs={breadcrumbs} />
      <ForumsAdminComponent />
    </main>
  );
}

export default ProfileIndex;
