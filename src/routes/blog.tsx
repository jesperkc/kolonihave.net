import { For, Show } from "solid-js";
import { useParams, type RouteSectionProps } from "@solidjs/router";
import { Meta, Title } from "@solidjs/meta";
import { posts, findPost, findPrevPost, findNextPost } from "~/data/posts";
import { MDXProvider } from "solid-mdx";
import { markdownComponents, PostImage } from "~/components/blog/Markdown";
import dayjs from "dayjs";
import type { Post } from "~/types";

const Blog = (props: RouteSectionProps<unknown>) => {
  const params = useParams();
  console.log("Blog params", params);
  return props.children;
};
export default Blog;
