import Link from "next/link";
import Breadcrumbs from "../../components/breadcrumbs";
import { useUsers } from "../../context/UserContext";
import { getUsers, setJesperAsAdmin, saveUser } from "../../functions/serverside/serverside-functions";
import { Button } from "@chakra-ui/react";
import SetAsAdmin from "../../../../components/setAsAdmin";
import AdminHeader from "../admin-header";
// import { create } from "./functions/actions";

async function UsersIndex(props) {
  // async function create() {
  //   "use server";

  //   // ...
  // }

  const users = await getUsers();

  const breadcrumbs = [
    {
      title: "Admin",
      slug: "admin",
    },
    {
      title: "Brugere",
      slug: "users",
    },
  ];
  return (
    <main className="users">
      <AdminHeader title={"Brugere"} breadcrumbs={breadcrumbs} />

      <div className="admin-table admin-users-table">
        {users &&
          users.map((user) => (
            <div key={user.uid} className="table-row">
              <td className="table-col">
                <Link href={`/admin/users/user?id=${user.uid}`}>{user.displayName}</Link>
              </td>
              <td className="table-col">{user.email}</td>
              <td className="table-col">{user.customClaims.ai ? "AI" : ""}</td>
            </div>
          ))}
      </div>
      <br />
      <br />
      <Link className="button" href={"/admin/users/user"}>
        Opret ny bruger
      </Link>
      <br />
      <br />

      {/* <SetAsAdmin
        func={async (e) => {
          "use server";
          const outcome = await setJesperAsAdmin("");
          console.log("outcome", outcome);
        }}
      /> */}
    </main>
  );
}

export default UsersIndex;
