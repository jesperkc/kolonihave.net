"use client";
import { useForum } from "../../context/ForumContext";
import Link from "next/link";
import { TForum } from "../../../types/forum.types";

function ForumsAdminComponent() {
  const { forums } = useForum();

  return (
    <div className="forums">
      <div className="admin-table admin-forums-table">
        {forums &&
          forums.map((forum: TForum) => (
            <div className="table-row" key={forum.id}>
              <div className="table-col">
                <Link href={`/admin/forums/forum?forumId=${forum.id}`}>{forum.name}</Link>
              </div>
              <div className="table-col">
                <Link href={`/admin/forums/forum/threads?forumId=${forum.id}`}>Tråde</Link>
              </div>
            </div>
          ))}
      </div>
      <br />
      <br />
      <Link className="button" href={"/admin/forums/forum"}>
        Opret nyt forum
      </Link>
    </div>
  );
}

export default ForumsAdminComponent;
