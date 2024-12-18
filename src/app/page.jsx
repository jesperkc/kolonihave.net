import path from "path";
import fs from "fs";
import matter from "gray-matter";
import { serialize } from "next-mdx-remote/serialize";

import MonthlyBlog from "./components/monthly-blog";
// import Allotments from "../src/app/components/allotments";
import Head from "next/head";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import VegestableIllustrationSvg from "/public/images/illustrations/illustration-vegestables.svg";
import LinkArrowSvg from "/src/assets/svg/icon-linkarrow.svg";

import { getMdxFiles, getMdx, getUrls, sortBySeason } from "../lib/load-posts";
import { Box, Flex, Stack } from "@chakra-ui/react";

export const metadata = {
  title: "Kolonihave.net",
};

async function Page() {
  const props = await getData();

  const getRandomTip = () => {
    const randomtip = props.quicktips.posts[Math.floor(Math.random() * props.quicktips.posts.length)];
    return randomtip.content;
  };

  const inspirationposts = props.inspiration.posts.slice(0, 5);
  return (
    <div>
      <div className="hero" style={{ backgroundImage: `url(${props.heroes.urls[3]})` }}>
        <main>
          <div className="landingpage-grid">
            <div className="grid-column">
              <Stack className="wobble-border landingpage-box" gap={"30px"}>
                <Flex justify={"space-between"}>
                  <div className="level-left">
                    <h5>Inspiration</h5>
                  </div>
                  <Box>
                    <Link href={"blog/inspiration"}>
                      Se alle <LinkArrowSvg />
                    </Link>
                  </Box>
                </Flex>

                <ul className="dash-list">
                  {inspirationposts.map((advice) => (
                    <li key={advice.url}>
                      <Link href={`${advice.url}`}>{advice.meta.title}</Link>
                    </li>
                  ))}
                </ul>
              </Stack>
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
        <div className="mdx wobble-border">
          <h1>{props.livet.meta.title}</h1>
          <h2>{props.livet.meta.desc}</h2>
          <MDXRemote source={props.livet.content} />
        </div>
      </main>
    </div>
  );
}

const getData = async () => {
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
  return returnData;
};

export default Page;
