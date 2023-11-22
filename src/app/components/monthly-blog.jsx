import Link from "next/link";
import styles from "../style/monthly-blog.scss";

function MonthlyBlog(props) {
  return (
    <div
      className="wobble-round monthly-blog"
      style={{ "--backgroundColorBox": props.backgroundColor, "--colorBox": props.color, "--borderColorBox": props.color }}
    >
      <h5>{props.title}</h5>
      <p>{props.desc}</p>
      <Link href={`/blog/aaret-i-haven/${props.slug}`}>Læs mere</Link>
    </div>
  );
}

export default MonthlyBlog;
