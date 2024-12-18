/* eslint-disable @next/next/no-img-element */
import fs from "fs";
import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import path from "path";
import Breadcrumbs from "../../../components/breadcrumbs";
import BlogTopGallery from "../../../components/blog-top-gallery";
import BlogLink from "../../../components/blog-link";
import { getMdxMeta } from "../../../../lib/load-posts";

const components = {
  Link,
  BlogLink,
  BlogTopGallery,
};

const POSTS_PATH = path.join(process.cwd(), "database", "blog", "groentsager");

export async function generateMetadata({ params, searchParams }, parent) {
  const meta = await getMdxMeta(POSTS_PATH, `${params.slug}.mdx`);

  return {
    title: `Kolonihave.net - ${meta.meta.title}`,
  };
}

export default async function PostPage({ params }) {
  const { source, meta } = await getData(params.slug);

  const breadcrumbs = [
    {
      title: "Blog",
      slug: "blog",
    },
    {
      title: "Grøntsager",
      slug: "groentsager",
    },
    {
      title: meta.title,
      slug: meta.slug,
    },
  ];
  return (
    <main className={["mdx"].join(" ")}>
      <article>
        <Breadcrumbs crumbs={breadcrumbs} />
        <h1>{meta.title}</h1>

        {meta.desc && <h2>{meta.desc}</h2>}
        {meta.image && <img src={meta.image} alt={"Illustration"} />}
        <MDXRemote source={source} components={components} />
      </article>
    </main>
  );
}

const getData = async (slug) => {
  const postFilePath = path.join(POSTS_PATH, `${slug}.mdx`);
  const source = fs.readFileSync(postFilePath);

  const { content, data } = matter(source);

  data.slug = slug;

  return {
    source: content,
    meta: data,
  };
};

const postFilePaths = fs
  .readdirSync(POSTS_PATH)
  // Only include md(x) files
  .filter((path) => /\.mdx?$/.test(path));

export async function generateStaticParams() {
  const paths = postFilePaths
    // Remove file extensions for page paths
    .map((path) => path.replace(/\.mdx?$/, ""))
    // Map the path into the static paths object required by Next.js
    .map((slug) => ({ slug }));
  return paths;
}
