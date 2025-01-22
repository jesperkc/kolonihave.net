import Breadcrumbs from "~/components/breadcrumbs";

import styles from "~/css/calendar-year-style.module.scss";
import { For, Suspense } from "solid-js";
import { Post, Section } from "~/types";
import { findSectionPosts } from "~/data/posts";

const breadcrumbs = [
  {
    title: "Blog",
    slug: "blog",
  },
  {
    title: "Året i haven",
    slug: "aaret-i-haven",
  },
];

const thismonth = new Date().getMonth();

const YearPageIndex = () => {
  const posts: Post[] | undefined = findSectionPosts("monthlypost");

  return (
    <div class={[styles["calendar-year-grid"], "mdx"].join(" ")}>
      <h1 class="has-text-centered">Årets gang i kolonihaven</h1>
      <ul>
        {/* <Counter /> */}
        <Suspense>
          <For each={posts}>
            {(month, i) => {
              return (
                <li
                  style={{
                    "--lightcolor": month?.color,
                    "--darkcolor": month?.backgroundColor,
                    "--backgroundColorBox": month?.backgroundColor,
                    "--colorBox": month?.color,
                  }}
                  class={thismonth === Number(i) ? "current-month superellipse" : "superellipse"}
                >
                  <a href={`/blog/aaret-i-haven/${month?.slug}`}>
                    <img src={month?.image} alt="illustration" />
                  </a>
                  <a href={`/blog/aaret-i-haven/${month?.slug}`} class="btn">
                    <strong>{month?.title}</strong>
                  </a>
                </li>
              );
            }}
          </For>
        </Suspense>
      </ul>
    </div>
  );
};

export default YearPageIndex;
