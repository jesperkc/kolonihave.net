import Link from "next/link";
import Breadcrumbs from "/src/app/components/breadcrumbs";
import { getMdxFiles } from "../../../lib/load-posts";
// import LabHewro from '@/components/lab-hero.component'
// import Section from '@/components/section.component'

const databaseFolder = "database/blog/groentsager/";

export const metadata = {
  title: "Kolonihave.net - Grøntsager",
};

async function Page() {
  const { posts } = await getMdxFiles(databaseFolder);
  const breadcrumbs = [
    {
      title: "Blog",
      slug: "blog",
    },
    {
      title: "Grøntsager",
      slug: "groentsager",
    },
  ];
  return (
    <main>
      <Breadcrumbs crumbs={breadcrumbs} />
      <h1>Grøntsager i haven</h1>
      <br />
      <ul className="dash-list">
        {posts &&
          posts.map((post, i) => {
            return (
              <li key={post.meta.title} style={{ "--color": post.meta.color }}>
                <Link href={`groentsager/${post.slug}`}>{post.meta.title}</Link>
              </li>
            );
          })}
      </ul>
    </main>
  );
}

export async function generateStaticParams() {
  const postPreviews = await getMdxFiles(databaseFolder);
  // postPreviews.posts = sortBySeason(postPreviews.posts);
  return postPreviews.posts;
}

export default Page;
