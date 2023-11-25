import styles from "/src/app/style/calendar-year-style.scss";
import styles2 from "/src/app/style/mdx-style.scss";
import Link from "next/link";
import fs from "fs";
import path from "path";
import { serialize } from "next-mdx-remote/serialize";
import Breadcrumbs from "../../../src/app/components/breadcrumbs";
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
  // get all MDX files
  const postFilePaths = fs.readdirSync(databaseFolder).filter((postFilePath) => {
    return path.extname(postFilePath).toLowerCase() === ".mdx";
  });

  const postPreviews = [];

  // read the frontmatter for each file
  for (const postFilePath of postFilePaths) {
    const postFile = fs.readFileSync(`${databaseFolder}${postFilePath}`, "utf8");

    // serialize the MDX content to a React-compatible format
    // and parse the frontmatter
    const serializedPost = await serialize(postFile, {
      parseFrontmatter: true,
    });

    postPreviews.push({
      meta: serializedPost.frontmatter,
      // add the slug to the frontmatter info
      slug: postFilePath.replace(".mdx", ""),
    });
  }
  const season = Math.floor((new Date().getMonth() + 4) / 3);
  postPreviews.sort(function (m1, m2) {
    var n1 = m1.meta.season,
      n2 = m2.meta.season;
    if (n1 < season) {
      n1 = n1 + 4;
    }
    if (n2 < season) {
      n2 = n2 + 4;
    }
    return n1 - n2;
  });

  return {
    props: {
      posts: postPreviews,
    },
    // enable ISR
    // revalidate: 60,
  };
}

export default Page;
