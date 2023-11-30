import Link from "next/link";
import HouseSvg from "/src/assets/svg/icon-house.svg";
import ToolSvg from "/src/assets/svg/icon-tool.svg";
import WobblyLine from "./wobbly-line";

const Nav = () => {
  return (
    <nav>
      <div>
        <ul>
          <li>
            <Link href={"/"}>
              <HouseSvg />
            </Link>
          </li>
          {/* <li>
              <Link href={"/kolonihaver-til-salg/"}>Kolonihaver til salg</Link>
            </li> */}
          <li className="logo">
            <Link href={"/"}>Kolonihave.net</Link>
          </li>
          <li>
            <Link href={"/blog/"}>
              <ToolSvg />
            </Link>
          </li>
        </ul>
      </div>
      <WobblyLine className={"wobbly"} />
    </nav>
  );
};

export default Nav;
