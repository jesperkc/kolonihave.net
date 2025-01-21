"use client";
import { createClientSignal } from "solid-use/client-only";
import { isServer } from "solid-js/web";
import { MetaProvider, Title, Link, Meta } from "@solidjs/meta";
import {
  createEffect,
  createRoot,
  createSignal,
  onCleanup,
  onMount,
  ParentComponent,
  Show,
} from "solid-js";
import { Frontmatter } from "~/types";

export const usePostCssVars = (meta: Frontmatter) => {};

// const ClientOnly: ParentComponent = (meta: Frontmatter) => {
//   const [mounted, setMounted] = createSignal(false);

//   onMount(() => setMounted(true));

//   return <Show when={mounted()}>YO</Show>;
// };

// export default ClientOnly;

const PostCssVars = (props: { meta?: Frontmatter }) => {
  const meta = () => props.meta;

  onMount(() => {
    if (meta()?.backgroundColor) {
      document.documentElement.style.setProperty(
        "--backgroundColorLight",
        meta()?.backgroundColor
      );
      document.documentElement.style.setProperty(
        "--backgroundColorDark",
        meta()?.color
      );
    }
    if (meta()?.color) {
      document.documentElement.style.setProperty(
        "--headlineColorLight",
        meta()?.color
      );
      document.documentElement.style.setProperty(
        "--headlineColorDark",
        meta()?.backgroundColor
      );
    }
    onCleanup(() => {
      document.documentElement.style.setProperty("--backgroundColorLight", "");
      document.documentElement.style.setProperty("--backgroundColorDark", "");
      document.documentElement.style.setProperty("--headlineColorLight", "");
      document.documentElement.style.setProperty("--headlineColorDark", "");
    });
  });

  return <div class="isClient"></div>;
};

export default PostCssVars;
