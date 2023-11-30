import Link from "next/link";
import { getMdxFiles, sortBySeason } from "/lib/load-posts";
import Head from "next/head";
import Breadcrumbs from "/src/app/components/breadcrumbs";
// import LabHewro from '@/components/lab-hero.component'
// import Section from '@/components/section.component'

function Page(props) {
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
      <Head>
        <title>Kolonihave.net - Grøntsager</title>
      </Head>
      <Breadcrumbs crumbs={breadcrumbs} />
      <h1>Grøntsager i haven</h1>
      <br />
      <ul className="dash-list">
        {props.posts &&
          props.posts.map((post, i) => {
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

const databaseFolder = "database/blog/groentsager/";

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
