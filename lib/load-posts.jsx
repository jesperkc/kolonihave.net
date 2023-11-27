import path from "path";
import fs from "fs";
import matter from "gray-matter";
import { serialize } from "next-mdx-remote/serialize";

export async function getMdxFiles(databaseFolder) {
  // get all MDX files
  const postFilePaths = fs.readdirSync(databaseFolder).filter((postFilePath) => {
    return path.extname(postFilePath).toLowerCase() === ".mdx";
  });

  const postPreviews = [];

  // read the frontmatter for each file
  for (const postFilePath of postFilePaths) {
    const postFile = fs.readFileSync(`${databaseFolder}${postFilePath}`, "utf8");

    // serialize the MDX content to a React-compatible format
    // and parse the frontmatter
    const serializedPost = await serialize(postFile, {
      parseFrontmatter: true,
    });

    postPreviews.push({
      meta: serializedPost.frontmatter,
      // add the slug to the frontmatter info
      url: `${databaseFolder}${postFilePath}`.replace(".mdx", "").replace("database/", ""),
      slug: postFilePath.replace(".mdx", ""),
    });
  }

  return {
    posts: postPreviews,
  };
}

export async function getMonthlyMdxFiles(databaseFolder) {
  // get all MDX files
  const postFilePaths = fs.readdirSync(databaseFolder).filter((postFilePath) => {
    return path.extname(postFilePath).toLowerCase() === ".mdx";
  });

  const postPreviews = {};

  // read the frontmatter for each file
  for (const postFilePath of postFilePaths) {
    const postFile = fs.readFileSync(`${databaseFolder}${postFilePath}`, "utf8");

    // serialize the MDX content to a React-compatible format
    // and parse the frontmatter
    const serializedPost = await serialize(postFile, {
      parseFrontmatter: true,
    });

    postPreviews[serializedPost.frontmatter.slug] = {
      ...serializedPost.frontmatter,
      // add the slug to the frontmatter info
      slug: postFilePath.replace(".mdx", ""),
    };
  }

  return {
    posts: postPreviews,
  };
}

export async function getMdx(filepath, file) {
  const postFilePath = path.join(filepath, file);
  const source = fs.readFileSync(postFilePath);

  const { content, data } = matter(source);
  const mdxSource = await serialize(content, {
    // Optionally pass remark/rehype plugins
    mdxOptions: {
      remarkPlugins: [],
      rehypePlugins: [],
    },
    scope: data,
  });

  return {
    source: mdxSource,
    content: content,
    meta: data,
    url: postFilePath.replace(".mdx", "").replace("database/", ""),
    slug: file.replace(".mdx", ""),
  };
}

export async function getUrls(databaseFolder) {
  // get all MDX files
  const postFilePaths = fs.readdirSync(databaseFolder).filter((postFilePath) => {
    return true;
  });

  const postPreviews = [];

  // read the frontmatter for each file
  for (const postFilePath of postFilePaths) {
    postPreviews.push(`${databaseFolder}/${postFilePath}`.replace("public", ""));
  }

  return {
    urls: postPreviews,
  };
}

// For the US Government fiscal year
// Oct-Dec = 1
// Jan-Mar = 2
// Apr-Jun = 3
// Jul-Sep = 4
function getQuarter(d) {
  d = d || new Date();
  var m = d.getMonth();
  if (m >= 8 && m < 11) {
    //Sept
    return 4;
  } else if (m >= 5) {
    //Juni
    return 3;
  } else if (m >= 2) {
    //Marts
    return 2;
  } else {
    return 1;
  }
}

export function sortBySeason(array) {
  const season = getQuarter();

  array.sort(function (m1, m2) {
    var n1 = m1.meta.season,
      n2 = m2.meta.season;
    if (n1 < season) {
      n1 = n1 + 12;
    }
    if (n2 < season) {
      n2 = n2 + 12;
    }
    return n1 - n2;
  });

  return array;
}
