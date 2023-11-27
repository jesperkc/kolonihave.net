import Link from "next/link";
import Breadcrumbs from "../../../src/app/components/breadcrumbs";
import { getMdxFiles, sortBySeason } from "../../../lib/load-posts";
// import LabHewro from '@/components/lab-hero.component'
// import Section from '@/components/section.component'

function Page(props) {
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
        {props.posts &&
          props.posts.map((post, i) => {
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

const databaseFolder = "database/blog/inspiration/";

export async function getStaticProps() {
  const postPreviews = await getMdxFiles(databaseFolder);
  postPreviews.posts = sortBySeason(postPreviews.posts);
  return {
    props: postPreviews,
    // enable ISR
    // revalidate: 60,
  };
}

export default Page;
