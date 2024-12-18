import Link from "next/link";
import ArrowSvg from "/src/assets/svg/icon-arrow.svg";

export type TBreadcrumb = {
  title: string;
  slug: string;
  params?: string;
};

export default function Breadcrumbs({ crumbs }: { crumbs?: TBreadcrumb[] }) {
  let href = [""];

  return (
    <div className="breadcrumbs">
      <ArrowSvg />
      {crumbs &&
        crumbs.map((crumb) => {
          href.push(crumb.slug);
          return (
            <div key={crumb.slug}>
              <Link href={`${href.join("/")}${crumb.params ? `?${crumb.params}` : ""}`}>{crumb.title}</Link>
            </div>
          );
        })}
    </div>
  );
}
