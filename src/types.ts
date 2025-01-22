export type Post = {
  title: string;
  date: Date;
  slug: string;
  tags: string[];
  series?: string;
  image?: string;
  featuredImageDesc?: string;
  desc: string;
  index: number;
  color?: string;
  backgroundColor?: string;
};

export type Tag = {
  // id/name of tag
  id: string;
  // indexes of posts with tag (they point to the posts list coming from virtual:blog-posts)
  posts: number[];
};

export type PostSeries = {
  [key: string]: Post[];
};

export type Series = {
  id: string;
  posts: number[];
};

export interface Frontmatter {
  title?: string;
  date?: string;
  description?: string;
  [key: string]: any;
}

export type Section = {
  title: string;
  id: string;
  slug: string;
};
