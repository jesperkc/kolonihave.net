import MonthlyBlog from "../src/app/components/monthly-blog";
// import Allotments from "../src/app/components/allotments";
import path from "path";
import fs from "fs";
import matter from "gray-matter";
import Head from "next/head";
import { useEffect, useState } from "react";
import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import VegestableIllustrationSvg from "/public/images/illustrations/illustration-vegestables.svg";
import Link from "next/link";

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

  return (
    <div>
      <div className="hero" style={{ backgroundImage: `url(${props.heroes.urls[3]})` }}>
        <main>
          <div className="landingpage-grid">
            <div className="grid-column">
              <div className="wobble-border landingpage-box">
                <h5>Inspiration</h5>
                <ul className="dash-list">
                  {props.inspiration.posts.map((advice) => (
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

async function getMdx(filepath, file) {
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

export const getStaticProps = async ({ params }) => {
  const paths = [
    {
      id: "quicktips",
      path: "database/quicktips/",
      sort: false,
    },
    {
      id: "inspiration",
      path: "database/blog/inspiration",
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
    // get all MDX files
    const postFilePaths = fs.readdirSync(element.path).filter((postFilePath) => {
      return true;
    });

    const postPreviews = [];

    // read the frontmatter for each file
    for (const postFilePath of postFilePaths) {
      postPreviews.push(`${element.path}/${postFilePath}`.replace("public", ""));
    }

    returnData[element.id] = {
      urls: postPreviews,
    };
  }

  const season = Math.floor((new Date().getMonth() + 4) / 3);

  for (const element of paths) {
    // get all MDX files
    const postFilePaths = fs.readdirSync(element.path).filter((postFilePath) => {
      return path.extname(postFilePath).toLowerCase() === ".mdx";
    });

    const postPreviews = [];

    // read the frontmatter for each file
    for (const postFilePath of postFilePaths) {
      const returnMdx = await getMdx(`${element.path}`, postFilePath);
      postPreviews.push(returnMdx);
    }

    if (element.sort) {
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
};

export default Page;
