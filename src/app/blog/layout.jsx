// import type { Metadata } from "next";
import Nav from "/src/app/components/nav";

// export const metadata: Metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

export default function SharedLayout(props) {
  return (
    <>
      <Nav user={props.user} />
      {props.children}
    </>
  );
}
