import type { Frontmatter, Section } from "~/types";

const Sections: Section[] = [
  { slug: "aaret-i-haven", id: "monthlypost", title: "Året i haven" },
  { slug: "inspiration", id: "inspiration", title: "Inspiration" },
  { slug: "groentsager", id: "groentsager", title: "Grøntsager" },
];

export const allSections: Section[] = Sections;

export const findSection = (section: string): Section | undefined => {
  return Sections.filter((s: Section) => s.slug === section).pop();
};
export const findSections = (section: string): Section[] | undefined => {
  return Sections.filter((s: Section) => s.slug === section);
};
