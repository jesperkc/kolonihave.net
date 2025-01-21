import { Route, Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { createSignal, onCleanup, onMount, Suspense } from "solid-js";
// import "./app.css";
import "./css/globals.css";
import "./css/style.scss";
import { MetaProvider, Title } from "@solidjs/meta";
import BlogSection from "./components/blog-section";
import Layout from "./components/layout";

export default function App() {
  onMount(() => {
    const listener = (e: KeyboardEvent) => {
      if (e.metaKey && e.key.toLowerCase() === "k") {
        e.preventDefault(); // Prevent the default action (optional)
        document.body.classList.toggle("debug");
      }
    };
    window.addEventListener("keydown", listener);
    onCleanup(() => {
      window.removeEventListener("keydown", listener);
    });
  });

  return (
    <MetaProvider>
      <Title>Kolonihave.net</Title>
      <Router
        root={(props) => {
          return (
            <Layout>
              <Suspense>{props.children}</Suspense>
            </Layout>
          );
        }}
      >
        <Route path={"/blog"} component={BlogSection} />
        <Route path={"/blog/:section"} component={BlogSection} />
        <FileRoutes />
      </Router>
    </MetaProvider>
  );
}
