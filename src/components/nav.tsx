// import { useAuthState } from "react-firebase-hooks/auth";
// import { auth, db } from "../firebase.config";
import { BirdHouseIcon24, ToolIcon24 } from "./icons";
// import LinkArrowSvg from "/src/assets/svg/icon-linkarrow.svg";
import WobblyLine from "./wobbly-line";

const Nav = ({ user }: { user: any }) => {
  // const [user] = useAuthState(auth);
  return (
    <nav>
      <div class="flex">
        <div class="flex" style={{ gap: "20" }}>
          <a href={"/"}>
            <BirdHouseIcon24 />
          </a>
          {/* <a href={"/forum/"}>
            <ChatIcon24 />
          </a> */}
        </div>

        <div class="logo">
          <a href={"/"}>Kolonihave.net</a>
        </div>
        <div class="flex" style={{ gap: "20" }}>
          {/* <a href={"/profil/"}>
            <PersonIcon24 />
          </a> */}
          <a href={"/blog/"}>
            <ToolIcon24 />
          </a>
        </div>
      </div>
      <WobblyLine class={"wobbly"} />
    </nav>
  );
};

export default Nav;
