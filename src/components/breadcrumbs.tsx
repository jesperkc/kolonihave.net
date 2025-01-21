import { createEffect, createSignal, For } from "solid-js";
import ArrowSvg from "/src/assets/svg/icon-arrow.svg";

export type TBreadcrumb = {
  title: string;
  slug: string;
  href?: string;
  params?: string;
};

export default function Breadcrumbs(props: { crumbs?: TBreadcrumb[] }) {
  const [breadcrumbs, setBreadcrumbs] = createSignal<TBreadcrumb[]>([]);
  const crumbs = () => props.crumbs;

  createEffect(() => {
    const href = [""];
    const b: TBreadcrumb[] = [];

    crumbs()?.forEach((crumb) => {
      href.push(crumb.slug);
      b.push({
        ...crumb,
        href: href.join("/"),
      });
    });

    setBreadcrumbs(b);
  });

  return (
    <div class="breadcrumbs">
      {/* <ArrowSvg /> */}
      <For each={breadcrumbs()}>
        {(crumb) => {
          return (
            <div>
              <a
                href={`${crumb.href}${crumb.params ? `?${crumb.params}` : ""}`}
              >
                {crumb.title}
              </a>
            </div>
          );
        }}
      </For>
    </div>
  );
}
