import { useEffect } from "react";
import { getAiUsers, getForum, getUsers } from "../../../../../functions/serverside/serverside-functions";
import AdminHeader from "../../../../admin-header";
import ThreadAdminNewComponent from "./admin-new-thread.component";

async function ProfileIndex({ searchParams: { forumId, threadId } }: { searchParams: { forumId: string; threadId: string } }) {
  const forum = await getForum(forumId);
  const users = await getAiUsers();
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
      <ThreadAdminNewComponent forumId={forumId} users={users} />
    </main>
  );
}

export default ProfileIndex;
