import { JSX } from "solid-js";
import "./mdx.scss";

const MDXArticle = (props: { children: any; meta?: any }) => {
  return (
    <div
      class={"mdx"}
      style={{
        "--color": props?.meta?.color ? props?.meta?.color : "",
      }}
    >
      <article>{props.children}</article>
    </div>
  );
};

export default MDXArticle;

// style={{
//   "--color": meta.color ? meta.color : "",
// }}
