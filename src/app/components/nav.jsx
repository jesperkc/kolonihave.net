import Link from "next/link";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/navigation";
import { auth, db } from "../firebase.config";
import WobblyLine from "./wobbly-line";
import { PersonIcon24, ToolIcon24, BirdHouseIcon24, ChatIcon24 } from "../../../components/icons";
import { Flex } from "@chakra-ui/react";

const Nav = ({ user }) => {
  // const [user] = useAuthState(auth);
  return (
    <nav>
      <Flex>
        <Flex gap={"20px"}>
          <Link href={"/"}>
            <BirdHouseIcon24 />
          </Link>
          {/* <Link href={"/forum/"}>
            <ChatIcon24 />
          </Link> */}
        </Flex>

        <div className="logo">
          <Link href={"/"}>Kolonihave.net</Link>
        </div>
        <Flex gap={"20px"}>
          {/* <Link href={"/profil/"}>
            <PersonIcon24 />
          </Link> */}
          <Link href={"/blog/"}>
            <ToolIcon24 />
          </Link>
        </Flex>
      </Flex>
      <WobblyLine className={"wobbly"} />
    </nav>
  );
};

export default Nav;
