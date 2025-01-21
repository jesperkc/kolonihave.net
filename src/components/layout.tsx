import { A, RouteSectionProps } from "@solidjs/router";
import { For, type ParentComponent } from "solid-js";
// import { TextHoverJump } from "./TextHoverJump";
import { clientOnly } from "@solidjs/start";
import Nav from "./nav";
import { Link, Meta } from "@solidjs/meta";

// const DarkModeToggle = clientOnly(() =>
// 	import("./DarkModeToggle").then((r) => ({
// 		default: r.DarkModeToggle,
// 	})),
// );

const Layout = (props: any) => {
  return (
    <>
      <Link
        href="//fonts.googleapis.com/css?family=Fauna+One:400"
        rel="stylesheet"
        type="text/css"
      />

      <a href="#main-content" class="sr-only">
        Skip to main content
      </a>
      <div class="page-wrapper">
        <Nav user={null} />
        {props.children}
      </div>
    </>
  );
};

export default Layout;
