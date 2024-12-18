import { useEffect, useState } from "react";
import { serversideAuth } from "../../../../../components/serverside-auth";
import { getForum } from "../../../functions/serverside/serverside-functions";
import { useAuth } from "../../../context/AuthContext";
import Link from "next/link";
import { saveForum } from "../../../../../components/clientside-data";
import Breadcrumbs from "../../../components/breadcrumbs";
import { useParams } from "next/navigation";
import ForumAdminComponent from "./admin-forum.component";
import AdminHeader from "../../admin-header";

// export const getServerSideProps = async (ctx) => {
//   const uid = ctx.query.uid;
//   const props: any = await serversideAuth(ctx, { roles: "admin" });
//   const forum = await getForum(uid);
//   props.props.forum = forum;
//   console.log("props.props", props.props);
//   return props;
// };

async function ForumAdminIndex({ searchParams: { forumId } }: { searchParams: { forumId: string } }) {
  const forum = forumId ? await getForum(forumId) : {};

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
      <AdminHeader title={"Ret forum"} breadcrumbs={breadcrumbs} />
      <ForumAdminComponent forum={forum} />
    </main>
  );
}

export default ForumAdminIndex;
