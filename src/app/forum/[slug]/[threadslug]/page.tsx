import type { NextPage } from "next";
import { getForums } from "../../../functions/serverside/serverside-functions";
import PostItems from "../../../../components/post/post-items.component";
import Breadcrumbs from "../../../components/breadcrumbs";
import { getForumBySlug, getForumIdBySlug } from "../../../../../components/clientside-data";
import { TForum } from "../../../../types/forum.types";

const PostPage: NextPage<any> = async ({ params }) => {
  // const { communityState } = useForumData();

  // if (params) {
  //   postsState = await getPost(params.pid);
  // }

  console.log("PostPage params", params);

  const forumData: TForum = await getData(params.slug);

  const breadcrumbs = [
    {
      title: "Forum",
      slug: "forum",
    },
    {
      title: forumData.name,
      slug: forumData.slug,
    },
  ];

  return (
    <main className="comments">
      <Breadcrumbs crumbs={breadcrumbs} />

      <>
        <PostItems forum={{ id: forumData.id }} threadslug={params.threadslug} />
      </>
    </main>
  );
};

async function getData(slug) {
  return await getForumBySlug(slug);
}

export default PostPage;
