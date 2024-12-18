"use client";
import { NextPage } from "next";
import ForumPageLayout from "../../../../components/layout/forum-layout.component";
import NewPostForm from "../../../../components/post/new-post-form.component";
import { getForums } from "../../../functions/serverside/serverside-functions";
import { TForum } from "../../../../types/forum.types";
import Breadcrumbs, { TBreadcrumb } from "../../../components/breadcrumbs";
import { useForum } from "../../../context/ForumContext";
import { useEffect, useState } from "react";

interface IProps {
  params: any;
}

const NewThreadComponent = ({ forum }) => {
  console.log("SubmitPage", forum);

  const [breadcrumbs, setBreadcrumbs] = useState<TBreadcrumb[]>([
    {
      title: "Forum",
      slug: "forum",
    },
  ]);
  const [currentForum, setForum] = useState<TForum | null>();
  const { getForumBySlug, loading } = useForum();

  useEffect(() => {
    if (!loading) {
      setForum(getForumBySlug(forum.slug));
    }
  }, [loading]);

  useEffect(() => {
    if (currentForum) {
      setBreadcrumbs([
        {
          title: "Forum",
          slug: "forum",
        },
        {
          title: currentForum.name,
          slug: currentForum.slug,
        },
      ]);
    }
  }, [currentForum]);

  return (
    <main className="submit">
      <Breadcrumbs crumbs={breadcrumbs} />
      {currentForum && (
        <h5>
          Skriv et nyt indlæg i <i>{currentForum.name}</i>
        </h5>
      )}
      <br />
      {currentForum && <NewPostForm forum={currentForum} />}
    </main>
  );
};

export default NewThreadComponent;
