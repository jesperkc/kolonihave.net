import { defineConfig } from "@solidjs/start/config";
//@ts-expect-error
import pkg from "@vinxi/plugin-mdx";
import { blogPostsPlugin } from "./build-helpers/blogPostsPlugin";
import remarkFrontmatter from "remark-frontmatter";
import rehypeMdxCodeProps from "rehype-mdx-code-props";
import { mdxPrism } from "./build-helpers/mdxPrism";
import remarkToc from "remark-toc";
import solidSvg from "vite-plugin-solid-svg";

const { default: mdx } = pkg;
export default defineConfig({
  extensions: ["mdx", "md"],
  vite: {
    plugins: [
      mdx.withImports({})({
        remarkPlugins: [remarkFrontmatter, remarkToc],
        rehypePlugins: [rehypeMdxCodeProps, mdxPrism],
        jsx: true,
        jsxImportSource: "solid-js",
        providerImportSource: "solid-mdx",
      }),
      blogPostsPlugin(),
      solidSvg({
        /**
         * If true, will export as JSX component if `as` isn't specified.
         *
         * Otherwise will export as url, or as JSX component if '?as=component-solid'
         *
         */
        defaultAsComponent: true,

        svgo: {
          enabled: true, // optional, by default is true
          svgoConfig: {
            plugins: [
              {
                name: "preset-default",
                params: {
                  overrides: {
                    removeViewBox: false,
                  },
                },
              },
            ],
          },
        },
      }),
    ],
  },
  server: {
    prerender: {
      crawlLinks: true,
    },
  },
});
