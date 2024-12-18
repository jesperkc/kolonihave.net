/* eslint-disable @next/next/no-img-element */
import styles from "/src/app/style/calendar-year-style.scss";
import Link from "next/link";
import Breadcrumbs from "../../components/breadcrumbs";
import { Metadata } from "next";
import Image from "next/image";
import { getMonthlyMdxFiles } from "../../../lib/load-posts";

const databaseFolder = "database/blog/aaret-i-haven/";

export const metadata = {
  title: "Kolonihave.net - Året i haven",
};

async function Garden() {
  const thismonth = new Date().getMonth();
  const months = ["januar", "februar", "marts", "april", "maj", "juni", "juli", "august", "september", "oktober", "november", "december"];

  const posts = await getMonthlyMdxFiles(databaseFolder);

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

  return (
    <main className={["calendar-year-grid", styles.mdx].join(" ")}>
      <Breadcrumbs crumbs={breadcrumbs} />
      <h1 className="has-text-centered">Årets gang i kolonihaven</h1>
      <ul>
        {months.map((month, i) => {
          const current = posts[month];
          return (
            <li
              key={current.title}
              style={{
                "--lightcolor": current.color,
                "--darkcolor": current.backgroundColor,
                "--backgroundColorBox": current.backgroundColor,
                "--colorBox": current.color,
              }}
              className={thismonth === i ? "current-month superellipse" : "superellipse"}
            >
              <Link href={`aaret-i-haven/${current.slug}`}>
                <img src={current.image} alt="illustration" />
              </Link>
              <Link href={`aaret-i-haven/${current.slug}`} className="btn">
                <strong>{current.title}</strong>
              </Link>
            </li>
          );
        })}
      </ul>
    </main>
  );
}

export async function generateStaticParams() {
  const postPreviews = await getMonthlyMdxFiles(`/${databaseFolder}`);
  return [...postPreviews];
}

export default Garden;
