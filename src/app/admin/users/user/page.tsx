import { createUser, getAiUser, getUser, saveUser } from "../../../functions/serverside/serverside-functions";
import Breadcrumbs from "../../../components/breadcrumbs";
import UserAdminComponent from "./admin-user.component";
import AdminHeader from "../../admin-header";

async function EditUserIndex({ params }: { params: Promise<{ id: string }> }) {
  const {id } = await params;
  const user = id ? await getUser(id) : {};

  // const [data, setData] = useState(user);
  console.log("EditUserIndex", user);
  // const { uid, displayName } = data;

  const save = async (data) => {
    "use server";
    return await saveUser({
      uid: data.uid,
      displayName: data.displayName,
      email: data.email,
      customClaims: { ai: data.customClaimsAi },
    });
  };
  const create = async (data) => {
    "use server";
    return await createUser({
      displayName: data.displayName,
      email: data.email,
      customClaims: { ai: data.customClaimsAi },
    });
  };

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
    <main className="user">
      <AdminHeader title={id ? "Ret bruger" : "Opret bruger"} breadcrumbs={breadcrumbs} />
      <UserAdminComponent edituser={user} saveUser={save} createUser={create} />
    </main>
  );
}

export default EditUserIndex;
