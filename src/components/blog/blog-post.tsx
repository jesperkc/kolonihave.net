// solid-refresh
import {
  Component,
  createEffect,
  createMemo,
  createSignal,
  lazy,
  Show,
  Suspense,
} from "solid-js";

import { markdownComponents, PostImage } from "~/components/Markdown";
import {
  cache,
  createAsync,
  RouteSectionProps,
  useParams,
} from "@solidjs/router";
import MDXArticle from "~/components/blog/mdx";
import Breadcrumbs, { TBreadcrumb } from "~/components/breadcrumbs";
import BlogTopGallery from "~/components/blog/blog-top-gallery";
import { getMdx, Tpostfrontmatter } from "../../../lib/load-posts";
import PostCssVars from "~/components/blog/postCssVars";
import { Meta, Title } from "@solidjs/meta";
import { findNextPost, findPost, findPrevPost } from "~/data/posts";
import { Frontmatter, Post } from "~/types";
import { MDXProvider } from "solid-mdx";
import { findSection } from "~/data/sections";

const components = {
  BlogTopGallery,
};

const BlogPost = (props: RouteSectionProps<unknown>) => {
  console.log("BlogPost blogSection");
  const blogSection = () => props.location.pathname.split("/")[2];
  const postSlug = () => props.location.pathname.split("/")[3];

  const section = () => findSection(blogSection());
  const actualSectionSlug = () => section()?.slug || "";
  const actualSectionId = () => section()?.id || "";
  const meta = () => findPost(actualSectionId(), postSlug()) as Frontmatter;

  const prevMeta = () => findPrevPost(actualSectionId(), postSlug());
  const nextMeta = () => findNextPost(actualSectionId(), postSlug());

  console.log("BlogPost blogSection", actualSectionId());
  const breadcrumbs = createMemo(() => {
    const breadcrumbsarray: TBreadcrumb[] = [
      {
        title: "Blog",
        slug: "blog",
      },
    ];

    breadcrumbsarray.push({
      title: section()?.title || "",
      slug: section()?.slug || "",
    });

    breadcrumbsarray.push({
      title: meta()?.title || meta()?.slug,
      slug: meta()?.slug,
    });

    return breadcrumbsarray;
  });

  return (
    <main>
      <article class="blog-post">
        <Title>andi.dev - {meta()?.title}</Title>
        <Meta name="og:title" content={meta()?.title} />
        <Meta name="description" content={meta()?.desc} />
        <Meta name="og:description" content={meta()?.desc} />
        {/* <Title title={mdxData()?.frontmatter.title} /> */}
        <MDXArticle meta={meta()}>
          <PostCssVars meta={meta()} />
          <Breadcrumbs crumbs={breadcrumbs()} />
          <h1>{meta()?.title}</h1>
          {meta()?.desc && <h2>{meta()?.desc}</h2>}
          {meta()?.image && <img src={meta()?.image} alt={"Illustration"} />}
          <MDXProvider components={markdownComponents}>
            {props.children}
          </MDXProvider>
        </MDXArticle>

        {/* <div class="mt-3v flex flex-col gap-1v">
          <Show when={prevMeta()} fallback={<div />}>
            <div class="flex gap-1h">
              <span>Forrige:</span>
              <a
                class="underline underline-offset-2"
                href={`${prevMeta()?.slug}`}
              >
                {prevMeta()?.title}
              </a>
            </div>
          </Show>
          <Show when={nextMeta()} fallback={<div />}>
            <div class="flex gap-1h">
              <span>Næste:</span>
              <a
                class="underline underline-offset-2"
                href={`${nextMeta()?.slug}`}
              >
                {nextMeta()?.title}
              </a>
            </div>
          </Show>
        </div> */}
      </article>
    </main>
  );
};

export default BlogPost;
