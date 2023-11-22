import Link from "next/link";
import ArrowSvg from "/src/assets/svg/arrows.svg";

export default function Breadcrumbs({ crumbs }) {
  let href = ["/"];
  return (
    <div className="breadcrumbs">
      <ArrowSvg />
      {crumbs.map((crumb) => {
        href.push(crumb.slug);
        return (
          <div>
            <Link href={href.join("/")}>{crumb.title}</Link>
          </div>
        );
      })}
    </div>
  );
}
