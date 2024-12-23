import { GetServerSidePropsContext, NextPage } from "next";
import NotFound from "../../../components/not-found/not-found.component";
import Posts from "../../../components/post/posts.component";
import { TForum } from "../../../types/forum.types";
import Breadcrumbs from "../../components/breadcrumbs";
// import { getForums } from "../../../../components/clientside-data";
import { getForumBySlug, getForums } from "../../functions/serverside/serverside-functions";
import CreatePostLink from "../../../components/forum/create-post-link.component";
import { Box, Flex } from "@chakra-ui/react";
import ForumPageLayout from "../../../components/layout/forum-layout.component";

interface IProps {
  params: any;
}

const ForumPage: NextPage<IProps> = async ({ params }) => {
  console.log("ForumPage slug", params.slug);
  const currentForum: TForum = await getForumBySlug(params.slug);
  const allForums: TForum[] = await getForums();

  if (!currentForum) {
    return <div>...</div>;
  }
  const breadcrumbs = [
    {
      title: "Forum",
      slug: "forum",
    },
    {
      title: currentForum.name,
      slug: currentForum.slug,
    },
  ];

  return currentForum ? (
    <main className="forum">
      {/* <ForumHeader slug={slug} /> */}

      <ForumPageLayout justify={"space-between"}>
        <Breadcrumbs crumbs={breadcrumbs} />
        <Box>
          <CreatePostLink slug={currentForum.slug} />
        </Box>
      </ForumPageLayout>
      <Flex>
        <Box>
          <Posts id={currentForum.id} />
        </Box>
        {/* <div className="column is-one-quarter-tablet is-align-items-flex-start">
          {allForums && allForums.map((forum) => <div key={forum.id}>{forum.name}</div>)}
        </div> */}
      </Flex>
    </main>
  ) : (
    <>
      <NotFound message="Sorry, this community may not exist or has been banned." />
    </>
  );
};

export async function generateStaticParams() {
  const forums = await getForums();
  const paths = forums.map((forum) => ({
    slug: forum.slug,
    id: forum.id,
  }));
  // console.log("paths", paths);
  return paths;
}

export default ForumPage;
