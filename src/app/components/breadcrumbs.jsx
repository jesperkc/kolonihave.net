import Link from "next/link";
import ArrowSvg from "/src/assets/svg/icon-arrow.svg";

export default function Breadcrumbs({ crumbs }) {
  let href = [""];
  return (
    <div className="breadcrumbs">
      <ArrowSvg />
      {crumbs.map((crumb) => {
        href.push(crumb.slug);
        return (
          <div key={crumb.slug}>
            <Link href={href.join("/")}>{crumb.title}</Link>
          </div>
        );
      })}
    </div>
  );
}
