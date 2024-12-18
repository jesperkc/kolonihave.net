import { useEffect } from "react";
import { serversideAuth } from "../../../../components/serverside-auth";
import { getForum, getThreads } from "../../../../functions/serverside/serverside-functions";
import { useAuth } from "../../../../context/AuthContext";
import Breadcrumbs from "../../../../components/breadcrumbs";
import ThreadsAdminComponent from "./admin-threads.component";
import AdminHeader from "../../../admin-header";
import Link from "next/link";

async function ProfileIndex({ searchParams: { forumId } }: { searchParams: { forumId: string } }) {
  const threads = await getThreads({ forumId: forumId });
  const forum = await getForum(forumId);
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
  ];
  return (
    <main className="threads">
      <AdminHeader title={"Tråde"} breadcrumbs={breadcrumbs} />
      <ThreadsAdminComponent threads={threads} />
      <Link className="button" href={`/admin/forums/forum/threads/new-thread/?forumId=${forumId}`}>
        Opret ny tråd
      </Link>
    </main>
  );
}

export default ProfileIndex;
