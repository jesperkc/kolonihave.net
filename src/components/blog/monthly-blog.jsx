import styles from "../../css/monthly-blog.module.scss";

function MonthlyBlog(props) {
  console.log("props", props);
  return (
    <div
      className={`wobble-round ${styles["monthly-blog"]}`}
      style={{
        "--backgroundColorBoxLight": props.backgroundColor,
        "--colorBoxLight": props.color,
        "--backgroundColorBoxDark": props.color,
        "--colorBoxDark": props.backgroundColor,
        "--borderColorBox": props.color,
      }}
    >
      <h5>{props.title}</h5>
      <p>{props.desc}</p>
      <a href={`/blog/aaret-i-haven/${props.slug}`}>Læs mere</a>
    </div>
  );
}

export default MonthlyBlog;
