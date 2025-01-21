import { For, Show } from "solid-js";
import { useParams, type RouteSectionProps } from "@solidjs/router";
import { Meta, Title } from "@solidjs/meta";
import { findNextPost, findPost, findPrevPost, posts } from "~/data/posts";
import { MDXProvider } from "solid-mdx";
import dayjs from "dayjs";
import type { Post } from "~/types";
import BlogPost from "~/components/blog/blog-post";

const Blog = (props: RouteSectionProps<unknown>) => {
  return <BlogPost {...props}></BlogPost>;

  // <Show when={meta()?.featuredImage}>
  //   <PostImage
  //     class="mb-3v saturate-0"
  //     src={meta()?.featuredImage || ""}
  //     alt={meta()?.featuredImageDesc || ""}
  //   />
  // </Show>
  {
    /* <p>{dayjs(meta().date).format("D MMMM YYYY")}</p> */
  }
  {
    /*
        <div class="">
          <For each={meta().tags}>
            {(tag, index) => (
              <>
                <a
                  href={`/tags/${tag}`}
                  class="font-medium underline underline-offset-2 italic"
                >
                  {tag}
                </a>
                {index() === meta().tags.length - 1 ? "" : ", "}
              </>
            )}
          </For>
        </div> */
  }
};
export default Blog;
