import { type RouteSectionProps } from "@solidjs/router";
import BlogPost from "~/components/blog/blog-post";

const Blog = (props: RouteSectionProps<unknown>) => {
  return <BlogPost {...props}></BlogPost>;
};
export default Blog;
