import styles from "/src/app/style/calendar-year-style.scss";
import styles2 from "/src/app/style/style.scss";
import Link from "next/link";
import fs from "fs";
import path from "path";
import { serialize } from "next-mdx-remote/serialize";
// import LabHewro from '@/components/lab-hero.component'
// import Section from '@/components/section.component'

function Garden(props) {
  const thismonth = new Date().getMonth();
  const months = ["januar", "februar", "marts", "april", "maj", "juni", "juli", "august", "september", "oktober", "november", "december"];
  return (
    <main className={["calendar-year-grid", styles.mdx].join(" ")}>
      <h1 className="has-text-centered">Årets gang i kolonihaven</h1>
      <ul>
        {months.map((month, i) => {
          const current = props.posts[month];
          return (
            <li
              key={current.title}
              style={{
                "--lightcolor": current.color,
                "--darkcolor": current.backgroundColor,
                "--backgroundColorBox": current.backgroundColor,
                "--colorBox": current.color,
              }}
              className={thismonth === i ? "current-month superellipse" : "superellipse"}
            >
              <Link href={`aaret-i-haven/${current.slug}`}>
                <img src={current.image} />
              </Link>
              <Link href={`aaret-i-haven/${current.slug}`} className="btn">
                <strong>{current.title}</strong>
              </Link>
            </li>
          );
        })}
      </ul>
    </main>
  );
}

export async function getStaticProps() {
  // get all MDX files
  const postFilePaths = fs.readdirSync("database/blog/aaret-i-haven/").filter((postFilePath) => {
    return path.extname(postFilePath).toLowerCase() === ".mdx";
  });

  const postPreviews = {};

  // read the frontmatter for each file
  for (const postFilePath of postFilePaths) {
    const postFile = fs.readFileSync(`database/blog/aaret-i-haven/${postFilePath}`, "utf8");

    // serialize the MDX content to a React-compatible format
    // and parse the frontmatter
    const serializedPost = await serialize(postFile, {
      parseFrontmatter: true,
    });

    postPreviews[serializedPost.frontmatter.slug] = {
      ...serializedPost.frontmatter,
      // add the slug to the frontmatter info
      slug: postFilePath.replace(".mdx", ""),
    };
  }

  return {
    props: {
      posts: postPreviews,
    },
    // enable ISR
    // revalidate: 60,
  };
}

export default Garden;
