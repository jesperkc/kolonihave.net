"use client";
import { useForum } from "../../../../context/ForumContext";
import Link from "next/link";
import { TForum } from "../../../../../types/forum.types";
import { getThreads } from "../../../../functions/serverside/serverside-functions";

function ThreadsAdminComponent({ threads }) {
  return (
    <div className="forums">
      <div className="admin-table admin-threads-table">
        {threads &&
          threads.map((thread: any) => (
            <div className="table-row" key={thread.id}>
              <div className="table-col">{thread.creatorDisplayName}</div>
              <div className="table-col">
                <Link href={`/admin/forums/forum/threads/thread?forumId=${thread.forumId}&threadId=${thread.id}`}>{thread.title}</Link>
              </div>
            </div>
          ))}
      </div>
      <br />
    </div>
  );
}

export default ThreadsAdminComponent;
