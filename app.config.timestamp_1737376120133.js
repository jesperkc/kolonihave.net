// app.config.ts
import { defineConfig } from "@solidjs/start/config";
import pkg from "@vinxi/plugin-mdx";

// build-helpers/blogPostsPlugin.ts
import { readSync } from "to-vfile";
import { matter as matter2 } from "vfile-matter";
import { resolve, join } from "node:path";
import { readdirSync, statSync, writeFileSync } from "node:fs";
import { exec } from "node:child_process";

// lib/load-posts.ts
import path from "path";
import fs from "fs";
import matter from "gray-matter";
function getQuarter(d) {
  d = d || /* @__PURE__ */ new Date();
  var m = d.getMonth();
  if (m >= 8 && m < 11) {
    return 4;
  } else if (m >= 5) {
    return 3;
  } else if (m >= 2) {
    return 2;
  } else {
    return 1;
  }
}
function sortBySeason(array) {
  const season = getQuarter();
  array.sort(function(m1, m2) {
    var n1 = m1.season, n2 = m2.season;
    if (n1 < season) {
      n1 = n1 + 12;
    }
    if (n2 < season) {
      n2 = n2 + 12;
    }
    return n1 - n2;
  });
  console.log("sortBySeason", array);
  return array;
}
function sortByMonth(array) {
  const months = ["januar", "februar", "marts", "april", "maj", "juni", "juli", "august", "september", "oktober", "november", "december"];
  const monthsArray = new Array();
  months.forEach((month) => {
    monthsArray.push(array.filter((a) => a.slug === month)[0]);
  });
  console.log("sortByMonth", monthsArray);
  return monthsArray;
}

// build-helpers/blogPostsPlugin.ts
var readFolder = (folder) => {
  const files = readdirSync(folder);
  return files.filter(
    (file) => statSync(join(folder, file)).isFile() && file.endsWith(".mdx")
  ).map((file) => {
    const f = readSync(resolve(folder, file));
    matter2(f);
    return {
      ...f.data.matter,
      slug: file.replace(".mdx", "")
    };
  }).sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
};
var processFiles = () => {
  const outputFile = resolve("src/data/posts.json");
  const blogPosts = /* @__PURE__ */ new Map();
  blogPosts.set(
    "monthlypost",
    sortByMonth(readFolder(resolve("src/routes/blog/aaret-i-haven")))
  );
  blogPosts.set(
    "inspiration",
    sortBySeason(readFolder(resolve("src/routes/blog/inspiration")))
  );
  blogPosts.set("quicktips", readFolder(resolve("src/routes/quicktips")));
  writeFileSync(
    outputFile,
    JSON.stringify(Object.fromEntries(blogPosts), null, 2),
    "utf-8"
  );
  exec("npx @biomejs/biome format --write ./src/data/posts.json");
};
var blogPostsPlugin = () => {
  return {
    name: "blog-posts-gen",
    buildEnd() {
      processFiles();
    },
    configureServer(server) {
      server.watcher.on("change", (filePath) => {
        if (!filePath.includes("src/database/blog/") && !filePath.includes("blogPostsPlugin.ts"))
          return;
        processFiles();
      });
    }
  };
};

// app.config.ts
import remarkFrontmatter from "remark-frontmatter";
import rehypeMdxCodeProps from "rehype-mdx-code-props";

// build-helpers/mdxPrism.ts
import { visit } from "unist-util-visit";
import { toString as nodeToString } from "hast-util-to-string";
import { refractor } from "refractor";
import tsx from "refractor/lang/tsx.js";
refractor.register(tsx);
var mdxPrism = () => {
  return (tree) => {
    visit(tree, "element", visitor);
  };
  function visitor(node, index, parent) {
    if (parent.type !== "mdxJsxFlowElement") {
      return;
    }
    const attrs = parent.attributes.reduce((a, c) => {
      if (c.type === "mdxJsxAttribute") {
        a[c.name] = c.value;
      }
      return a;
    }, {});
    const lang = attrs.lang;
    if (!lang) {
      return;
    }
    const result = refractor.highlight(nodeToString(node), lang);
    node.children = result.children;
  }
};

// app.config.ts
import remarkToc from "remark-toc";
var { default: mdx } = pkg;
var app_config_default = defineConfig({
  extensions: ["mdx", "md"],
  vite: {
    plugins: [
      mdx.withImports({})({
        remarkPlugins: [remarkFrontmatter, remarkToc],
        rehypePlugins: [rehypeMdxCodeProps, mdxPrism],
        jsx: true,
        jsxImportSource: "solid-js",
        providerImportSource: "solid-mdx"
      }),
      blogPostsPlugin()
    ]
  },
  server: {
    prerender: {
      crawlLinks: true
    }
  }
});
export {
  app_config_default as default
};
