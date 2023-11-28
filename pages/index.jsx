import path from "path";
import fs from "fs";
import matter from "gray-matter";
import { serialize } from "next-mdx-remote/serialize";

import MonthlyBlog from "../src/app/components/monthly-blog";
// import Allotments from "../src/app/components/allotments";
import Head from "next/head";
import { useEffect, useState } from "react";
import { MDXRemote } from "next-mdx-remote";
import Link from "next/link";
import VegestableIllustrationSvg from "/public/images/illustrations/illustration-vegestables.svg";
import LinkArrowSvg from "/src/assets/svg/icon-linkarrow.svg";

import { getMdxFiles, getMdx, getUrls, sortBySeason } from "../lib/load-posts";

async function getMdxFiles1(databaseFolder) {
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

  return {
    posts: postPreviews,
  };
}

async function getMonthlyMdxFiles(databaseFolder) {
  // get all MDX files
  const postFilePaths = fs.readdirSync(databaseFolder).filter((postFilePath) => {
    return path.extname(postFilePath).toLowerCase() === ".mdx";
  });

  const postPreviews = {};

  // read the frontmatter for each file
  for (const postFilePath of postFilePaths) {
    const postFile = fs.readFileSync(`${databaseFolder}${postFilePath}`, "utf8");

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
    posts: postPreviews,
  };
}

async function getMdx2(filepath, file) {
  const postFilePath = path.join(filepath, file);
  const source = fs.readFileSync(postFilePath);

  const { content, data } = matter(source);
  const mdxSource = await serialize(content, {
    // Optionally pass remark/rehype plugins
    mdxOptions: {
      remarkPlugins: [],
      rehypePlugins: [],
    },
    scope: data,
  });

  return {
    source: mdxSource,
    content: content,
    meta: data,
    url: postFilePath.replace(".mdx", "").replace("database/", ""),
    slug: file.replace(".mdx", ""),
  };
}

async function getUrls2(databaseFolder) {
  // get all MDX files
  const postFilePaths = fs.readdirSync(databaseFolder).filter((postFilePath) => {
    return true;
  });

  const postPreviews = [];

  // read the frontmatter for each file
  for (const postFilePath of postFilePaths) {
    postPreviews.push(`${databaseFolder}/${postFilePath}`.replace("public", ""));
  }

  return {
    urls: postPreviews,
  };
}

const components = {
  // It also works with dynamically-imported components, which is especially
  // useful for conditionally loading components for certain routes.
  // See the notes in README.md for more details.
  // TestComponent: dynamic(() => import('../../components/TestComponent')),
  Head,
};

function Page(props) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const getRandomTip = () => {
    const randomtip = props.quicktips.posts[Math.floor(Math.random() * props.quicktips.posts.length)];
    return randomtip.content;
  };

  const inspirationposts = props.inspiration.posts.slice(0, 5);
  return (
    <div>
      <Head>
        <title>Kolonihave.net</title>
      </Head>
      <div className="hero" style={{ backgroundImage: `url(${props.heroes.urls[3]})` }}>
        <main>
          <div className="landingpage-grid">
            <div className="grid-column">
              <div className="wobble-border landingpage-box">
                <div className="level">
                  <div className="level-left">
                    <h5>Inspiration</h5>
                  </div>
                  <div className="level-right">
                    <Link href={"blog/inspiration"}>
                      Se alle <LinkArrowSvg />
                    </Link>
                  </div>
                </div>

                <ul className="dash-list">
                  {inspirationposts.map((advice) => (
                    <li key={advice.url}>
                      <Link href={`${advice.url}`}>{advice.meta.title}</Link>
                    </li>
                  ))}
                </ul>
              </div>
              {/* <div className="wobble-border" style={{ "--backgroundColorBox": "#fff2dd" }}>
                <h5>Tip</h5>
                {isClient ? getRandomTip() : ""}
              </div> */}
            </div>
            <div className="grid-column column-right">
              <MonthlyBlog {...props.monthlypost.meta} />
              <div className="landingpage-hero-illustration">
                <VegestableIllustrationSvg />
              </div>
            </div>
          </div>

          {/* <Allotments /> */}
        </main>
      </div>
      <main>
        {isClient && (
          <div className="mdx wobble-border">
            <h1>{props.livet.meta.title}</h1>
            <h2>{props.livet.meta.desc}</h2>
            <MDXRemote {...props.livet.source} components={components} />
          </div>
        )}
      </main>
    </div>
  );
}

export const getStaticProps = async ({ params }) => {
  const paths = [
    {
      id: "quicktips",
      path: "database/quicktips/",
      sort: false,
    },
    {
      id: "inspiration",
      path: "database/blog/inspiration/",
      sort: true,
    },
  ];
  const urls = [
    {
      id: "heroes",
      path: "public/images/heroes/",
    },
  ];

  const returnData = {};

  const months = ["januar", "februar", "marts", "april", "maj", "juni", "juli", "august", "september", "oktober", "november", "december"];
  returnData.monthlypost = await getMdx(`database/blog/aaret-i-haven/`, `${months[new Date().getMonth()]}.mdx`);
  returnData.livet = await getMdx(`database/blog/`, `kolonihavelivet.mdx`);
  // const mdxSource = await serialize(returnData.livet.content, {
  //   // Optionally pass remark/rehype plugins
  //   mdxOptions: {
  //     remarkPlugins: [],
  //     rehypePlugins: [],
  //   },
  //   scope: returnData.livet.data,
  // });

  // returnData.livet.source = mdxSource;

  for (const element of urls) {
    returnData[element.id] = await getUrls(element.path);
  }

  for (const element of paths) {
    // get all MDX files
    let postFilePaths = await getMdxFiles(element.path);

    if (element.sort) {
      postFilePaths.posts = sortBySeason(postFilePaths.posts);
    }
    returnData[element.id] = postFilePaths;
  }
  return {
    props: returnData,
    // enable ISR
    // revalidate: 60,
  };
};

export default Page;
