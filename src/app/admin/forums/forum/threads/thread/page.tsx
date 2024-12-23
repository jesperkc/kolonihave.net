import { useEffect } from "react";
import { getAiUsers, getForum, getUsers } from "../../../../../functions/serverside/serverside-functions";
import AdminHeader from "../../../../admin-header";
import ThreadAdminComponent from "./admin-thread.component";

async function ProfileIndex({ params }: { params: Promise<{ forumId: string, threadId: string }> }) {
  const {forumId, threadId} = await params;
  const forum = await getForum(forumId);
  const users = await getUsers();
  const breadcrumbs = [
    {
      title: "Admin",
      slug: "admin",
    },
    {
      title: "Fora",
      slug: "forums",
    },
    {
      title: forum.name,
      slug: "forum",
      params: `forumId=${forumId}`,
    },
    {
      title: "Tråde",
      slug: "threads",
    },
  ];
  return (
    <main className="threads">
      <AdminHeader title={"Tråde"} breadcrumbs={breadcrumbs} />
      <ThreadAdminComponent threadId={threadId} users={users} />
    </main>
  );
}

export default ProfileIndex;
