// @ts-expect-error
import Posts from "./posts.json";
import type { Frontmatter, Post, PostSeries } from "~/types";

export const posts: Post[][] = Object.keys(Posts).map((key: string) => {
  return Posts[key].map((p: Post, i: number) => ({
    ...p,
    index: i,
    // date: new Date(p.date),
  }));
});

export const findSectionPosts = (section: string): Post[] | undefined => {
  return Posts[section];
};

export const getMonthlyPost = (): Post => {
  const date = new Date();
  return Posts["monthlypost"][date.getMonth()];
};

export const findPost = (
  section: string | undefined,
  slug: string
): Frontmatter | undefined => {
  console.log("section", section, slug);
  if (!section || !slug) return undefined;
  for (const post of Posts[section]) {
    if (post.slug === slug) return post;
  }
  return undefined;
};

export const findPrevPost = (
  section: string | undefined,
  slug: string
): Post | undefined => {
  // find previous post in array
  if (!section || !slug) return undefined;
  let prevPost: Post | undefined;
  for (const post of Posts[section]) {
    if (post.slug === slug) return prevPost;
    prevPost = post;
  }
};

export const findNextPost = (
  section: string | undefined,
  slug: string
): Post | undefined => {
  // find next post in array
  if (!section || !slug) return undefined;
  let found = false;
  for (const post of Posts[section]) {
    if (found) return post;
    if (post.slug === slug) found = true;
  }
};
