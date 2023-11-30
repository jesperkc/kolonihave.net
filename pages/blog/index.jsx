import styles from "/src/app/style/calendar-year-style.scss";
import styles2 from "/src/app/style/style.scss";
import Link from "next/link";
import fs from "fs";
import path from "path";
import { serialize } from "next-mdx-remote/serialize";
import Head from "next/head";
// import LabHewro from '@/components/lab-hero.component'
// import Section from '@/components/section.component'

function Page(props) {
  const months = ["januar", "februar", "marts", "april", "maj", "juni", "juli", "august", "september", "oktober", "november", "december"];
  return (
    <main>
      <Head>
        <title>Kolonihave.net - Blog</title>
      </Head>
      <h2>Inspiration</h2>
      <br />
      <ul className="dash-list">
        {props.inspiration.posts &&
          props.inspiration.posts.map((post, i) => {
            return (
              <li key={post.title}>
                <Link href={`/blog/inspiration/${post.slug}`}>{post.title}</Link>
              </li>
            );
          })}
      </ul>
      <br />
      <br />
      <h2>Året i kolonihaven</h2>
      <br />
      <ul className="blog-posts calendar-year-posts">
        {months.map((post, i) => {
          return (
            <li key={post}>
              <Link href={`/blog/aaret-i-haven/${post}`}>{post}</Link>
            </li>
          );
        })}
      </ul>
      <br />
      <br />
      <h2>Grøntsager</h2>
      <br />
      <ul className="dash-list">
        {props.groentsager.posts &&
          props.groentsager.posts.map((post, i) => {
            return (
              <li key={post.title}>
                <Link href={`/blog/groentsager/${post.slug}`}>{post.title}</Link>
              </li>
            );
          })}
      </ul>
    </main>
  );
}

export async function getStaticProps() {
  const paths = [
    {
      id: "inspiration",
      path: "database/blog/inspiration/",
    },
    {
      id: "groentsager",
      path: "database/blog/groentsager/",
    },
    // {
    //   id: "calendaryear",
    //   path: "database/blog/aaret-i-haven/",
    // },
  ];

  const returnData = {};
  for (const element of paths) {
    // get all MDX files
    const postFilePaths = fs.readdirSync(element.path).filter((postFilePath) => {
      return path.extname(postFilePath).toLowerCase() === ".mdx";
    });

    const postPreviews = [];

    // read the frontmatter for each file
    for (const postFilePath of postFilePaths) {
      const postFile = fs.readFileSync(`${element.path}${postFilePath}`, "utf8");

      // serialize the MDX content to a React-compatible format
      // and parse the frontmatter
      const serializedPost = await serialize(postFile, {
        parseFrontmatter: true,
      });

      postPreviews.push({
        ...serializedPost.frontmatter,
        // add the slug to the frontmatter info
        slug: postFilePath.replace(".mdx", ""),
      });
    }

    returnData[element.id] = {
      posts: postPreviews,
    };
  }

  return {
    props: returnData,
    // enable ISR
    // revalidate: 60,
  };
}

export default Page;
