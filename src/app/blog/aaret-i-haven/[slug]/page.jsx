/* eslint-disable @next/next/no-img-element */
import fs from "fs";
import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote/rsc";
import path from "path";
import PostCssVars from "./postCssVars";

// import "/src/app/style/globals.css";
import Breadcrumbs from "/src/app/components/breadcrumbs";
import { getMdxMeta } from "../../../../lib/load-posts";

// Custom components/renderers to pass to MDX.
// Since the MDX files aren't loaded by webpack, they have no knowledge of how
// to handle import statements. Instead, you must include components in scope
// here.
const components = {
  // It also works with dynamically-imported components, which is especially
  // useful for conditionally loading components for certain routes.
  // See the notes in README.md for more details.
  // TestComponent: dynamic(() => import('../../components/TestComponent')),
  img: (props) => <img {...props} layout="responsive" loading="lazy" alt="illustration" />,
};

const POSTS_PATH = path.join(process.cwd(), "database", "blog", "aaret-i-haven");

export async function generateMetadata({ params, searchParams }, parent) {
  const meta = await getMdxMeta(POSTS_PATH, `${params.slug}.mdx`);

  return {
    title: `Kolonihave.net - ${meta.meta.title}`,
  };
}

const postFilePaths = fs
  .readdirSync(POSTS_PATH)
  // Only include md(x) files
  .filter((path) => /\.mdx?$/.test(path));

export default async function PostPage({ params }) {
  const { source, meta } = await getPost(params.slug);

  const breadcrumbs = [
    {
      title: "Blog",
      slug: "blog",
    },
    {
      title: "Året i haven",
      slug: "aaret-i-haven",
    },
    {
      title: meta.title,
      slug: meta.slug,
    },
  ];

  return (
    <main
      className={"mdx"}
      style={{
        "--color": meta.color ? meta.color : "",
      }}
    >
      <PostCssVars meta={meta} />
      <article>
        <Breadcrumbs crumbs={breadcrumbs} />
        <h1>{meta.title} i haven</h1>
        <h2>{meta.desc}</h2>
        <img src={meta.image} alt={"Illustration"} />
        <MDXRemote source={source} />
      </article>
    </main>
  );
}

const getPost = (slug) => {
  console.log("slug", slug);
  const postFilePath = path.join(POSTS_PATH, `${slug}.mdx`);
  const source = fs.readFileSync(postFilePath);

  const { content, data } = matter(source);

  data.slug = slug;

  return {
    source: content,
    meta: data,
  };
};

export async function generateStaticParams() {
  const paths = postFilePaths
    // Remove file extensions for page paths
    .map((path) => path.replace(/\.mdx?$/, ""))
    // Map the path into the static paths object required by Next.js
    .map((slug) => ({ slug, meta: "yo" }));

  return paths;
}
