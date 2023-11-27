import { links } from "../data/links";
import Svg from "../../assets/svg/icon-externallink.svg";

const BlogLink = (props) => {
  const link = links[props.link];
  return (
    <a href={link.url} target="_blank" className="external-link">
      {props.children ?? link.title} <Svg />
    </a>
  );
};

export default BlogLink;
