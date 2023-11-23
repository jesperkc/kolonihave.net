import styles from "/src/app/style/calendar-year-style.scss";
import styles2 from "/src/app/style/mdx-style.scss";
import Link from "next/link";
import fs from "fs";
import path from "path";
import { serialize } from "next-mdx-remote/serialize";
// import LabHewro from '@/components/lab-hero.component'
// import Section from '@/components/section.component'

function Page(props) {
  console.log(props);
  return (
    <main>
      <h1>Gode råd til kolonihaven</h1>
      <br />
      <ul className="dash-list">
        {props.posts &&
          props.posts.map((post, i) => {
            return (
              <li key={post.title} style={{ "--color": post.color }}>
                <Link href={`gode-raad/${post.slug}`}>{post.title}</Link>
              </li>
            );
          })}
      </ul>
    </main>
  );
}

export async function getStaticProps() {
  // get all MDX files
  const postFilePaths = fs.readdirSync("database/blog/gode-raad/").filter((postFilePath) => {
    return path.extname(postFilePath).toLowerCase() === ".mdx";
  });

  const postPreviews = [];

  // read the frontmatter for each file
  for (const postFilePath of postFilePaths) {
    const postFile = fs.readFileSync(`database/blog/gode-raad/${postFilePath}`, "utf8");

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

  return {
    props: {
      posts: postPreviews,
    },
    // enable ISR
    // revalidate: 60,
  };
}

export default Page;
