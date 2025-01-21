import { useParams, type RouteSectionProps } from "@solidjs/router";
import { For } from "solid-js";
import { findSectionPosts } from "~/data/posts";
import Breadcrumbs, { TBreadcrumb } from "./breadcrumbs";
import { findSection, allSections, findSections } from "~/data/sections";
import { Section } from "~/types";

const BlogSection = (props: RouteSectionProps<unknown>) => {
  const params = useParams();

  const sections: Section[] | undefined = params.section
    ? findSections(params.section)
    : allSections;

  const breadcrumbs: TBreadcrumb[] = [
    {
      title: "Blog",
      slug: "blog",
    },
  ];

  if (sections && sections?.length < 2) {
    breadcrumbs.push({
      title: sections[0].title,
      slug: sections[0].slug,
    });
  }

  return (
    <main>
      {breadcrumbs && breadcrumbs.length > 1 && (
        <Breadcrumbs crumbs={breadcrumbs} />
      )}

      <For each={sections}>
        {(section) => <BlogSectionList section={section} />}
      </For>
    </main>
  );
};

const BlogSectionList = ({ section }: { section: Section }) => {
  const posts = findSectionPosts(section.id);
  console.log("BlogSectionList section", section);

  return (
    <div>
      <h2>{section.title}</h2>
      <br />
      <ul class="dash-list">
        <For each={posts}>
          {(post) => (
            <li>
              <a href={`/blog/${section.slug}/${post.slug}`}>{post?.title}</a>
            </li>
          )}
        </For>
      </ul>
      <br />
      <br />
    </div>
  );
};

export default BlogSection;
