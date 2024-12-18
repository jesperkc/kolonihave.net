import Link from "next/link";
import { getMdxFiles, sortBySeason } from "../../../lib/load-posts";
import Breadcrumbs from "/src/app/components/breadcrumbs";
// import LabHewro from '@/components/lab-hero.component'
// import Section from '@/components/section.component'

const databaseFolder = "database/blog/inspiration/";

export const metadata = {
  title: "Kolonihave.net - Inspiration til kolonihaven",
};

async function Page() {
  const data = await getMdxFiles(databaseFolder);
  data.posts = sortBySeason(data.posts);

  const { posts } = data;

  const breadcrumbs = [
    {
      title: "Blog",
      slug: "blog",
    },
    {
      title: "Inspiration",
      slug: "inspiration",
    },
  ];
  return (
    <main>
      <Breadcrumbs crumbs={breadcrumbs} />
      <h1>Inspiration til kolonihaven</h1>
      <br />
      <ul className="dash-list">
        {posts &&
          posts.map((post, i) => {
            return (
              <li key={post.meta.title} style={{ "--color": post.meta.color }}>
                <Link href={`inspiration/${post.slug}`}>{post.meta.title}</Link>
              </li>
            );
          })}
      </ul>
    </main>
  );
}

export async function generateStaticParams() {
  const postPreviews = await getMdxFiles(databaseFolder);
  return postPreviews.posts;
}

export default Page;
