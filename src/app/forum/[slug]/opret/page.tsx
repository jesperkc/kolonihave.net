import { NextPage } from "next";
import ForumPageLayout from "../../../../components/layout/forum-layout.component";
import NewPostForm from "../../../../components/post/new-post-form.component";
import { getForums } from "../../../functions/serverside/serverside-functions";
import { TForum } from "../../../../types/forum.types";
import Breadcrumbs from "../../../components/breadcrumbs";
import { useForum } from "../../../context/ForumContext";
import NewThreadComponent from "./new-thread.component";

interface IProps {
  params: any;
}

const SubmitPage: NextPage<IProps> = async ({ params }) => {
  console.log("SubmitPage", params);

  return (
    <main className="submit">
      <NewThreadComponent forum={params} />
    </main>
  );
};

export async function generateStaticParams() {
  const forums = await getForums();
  const paths = forums.map((forum) => ({
    slug: forum.slug,
    id: forum.id,
  }));
  console.log("paths", paths);
  return paths;
}

export default SubmitPage;
