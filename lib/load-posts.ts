"use server"
import path from "path";
import fs from "fs";
import matter from "gray-matter";
// import { serialize } from "next-mdx-remote/serialize";


export type Tfrontmatter = {
  slug: string;
  title: string;
  season: any;
  date: string;
}

export type Tpostfrontmatter = {
  [Key: string]: any
}

export type TPostList = {
  frontmatter: Tpostfrontmatter,
  url: string,
  slug: string
}

export type TMDXContent = {
  frontmatter: Tpostfrontmatter,
  content: string,
}
export async function getJsonFile() {
  const postFile = JSON.parse(fs.readFileSync(`./src/data/posts.json`, "utf8"));

  return postFile as Tpostfrontmatter;
}

export async function getMdxFiles(databaseFolder: string) {
  // get all MDX files
  const postFilePaths = fs.readdirSync(databaseFolder).filter((postFilePath) => {
    return path.extname(postFilePath).toLowerCase() === ".mdx";
  });

  const postPreviews:TPostList[] = [];

  // read the frontmatter for each file
  for (const postFilePath of postFilePaths) {
    const postFile = fs.readFileSync(`${databaseFolder}${postFilePath}`, "utf8");

    // serialize the MDX content to a React-compatible format
    // and parse the frontmatter
    // const serializedPost = {frontmatter:''};
    const { data: frontmatter, content } = matter(postFile);
    // const serializedPost = await serialize(postFile, {
    //   parseFrontmatter: true,
    // });

    postPreviews.push({
      frontmatter: frontmatter,
      // add the slug to the frontmatter info
      url: `${databaseFolder}${postFilePath}`.replace(".mdx", "").replace("database/", ""),
      slug: postFilePath.replace(".mdx", ""),
    });
  }

  console.log('postPreviews',postPreviews);
  return postPreviews;
}

export async function getMonthlyMdxFiles(databaseFolder: string) {
  // get all MDX files
  console.log('databaseFolder',path.resolve(databaseFolder));
  const postFilePaths = fs.readdirSync(path.resolve(databaseFolder)).filter((postFilePath) => {
    return path.extname(postFilePath).toLowerCase() === ".mdx";
  });
  const postPreviews = new Map<string, any>();

  // read the frontmatter for each file
  for (const postFilePath of postFilePaths) {
    const postFile = fs.readFileSync(`${databaseFolder}${postFilePath}`, "utf8");
    // serialize the MDX content to a React-compatible format
    // and parse the frontmatter
    const { data: frontmatter, content } = matter(postFile);
    // const serializedPost = await serialize(postFile, {
    //   parseFrontmatter: true,
    // });

    postPreviews.set(frontmatter.slug, {
      ...frontmatter,
      // add the slug to the frontmatter info
      slug: postFilePath.replace(".mdx", ""),
    });
  }

  return postPreviews;
}


export type TPosts = Map<string, any>;


export async function getBlogMdxFiles(paths: any[]) {
  // get all MDX files
  console.log('databaseFolder',paths);
  const returnData = new Map() as TPosts;
  for (const element of paths) {
    // get all MDX files
    const postFilePaths = fs.readdirSync(element.path).filter((postFilePath: string) => {
      return path.extname(postFilePath).toLowerCase() === ".mdx";
    });

    const postPreviews = [];

    // read the frontmatter for each file
    for (const postFilePath of postFilePaths) {
      const postFile = fs.readFileSync(`${element.path}${postFilePath}`, "utf8");

      // serialize the MDX content to a React-compatible format
      // and parse the frontmatter
      const { data: frontmatter, content } = matter(postFile);
      // const serializedPost = await serialize(postFile, {
      //   parseFrontmatter: true,
      // });

      postPreviews.push({
        ...frontmatter,
        // add the slug to the frontmatter info
        slug: postFilePath.replace(".mdx", ""),
      });
    }

    returnData.set(element.id, {
      posts: postPreviews,
    })
  }

  console.log('returnData',returnData);
  return returnData;
}

export async function getMdx(slug: string):Promise<TMDXContent> {
  try {
    // Construct the file path - adjust the base path as needed
    const filePath = path.join(process.cwd(), 'src', 'database', 'blog', `${slug}.mdx`);

    // Read the MDX file
    const fileContent = fs.readFileSync(filePath, 'utf-8');

    // Parse frontmatter
    const { data: frontmatter, content } = matter(fileContent);

    console.log(frontmatter);
    return {
      frontmatter,
      content
    };
  } catch (error) {
    console.error(`Error loading MDX file for slug ${slug}:`, error);
    return {
      frontmatter: {},
      content: ''
    };
  }
}

export async function getMdxMeta(filepath: string, file: string) {
  const postFilePath = path.join(filepath, file);
  const source = fs.readFileSync(postFilePath);

  const { data } = matter(source);

  return {
    meta: data,
  };
}

export async function getUrls(databaseFolder: string) {
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

export async function getMonthMdx() {
  const params = {month: 'april'}
  console.log('server params',params.month)
  try {
    // Construct the file path - adjust the base path as needed
    const filePath = path.join(process.cwd(), 'src', 'database', 'blog', 'aaret-i-haven', `${params.month}.mdx`);

    // Read the MDX file
    const fileContent = fs.readFileSync(filePath, 'utf-8');

    // Parse frontmatter
    const { data: frontmatter, content } = matter(fileContent);

    return {
      frontmatter,
      content
    };
  } catch (error) {
    console.error(`Error loading MDX file for slug ${params.month}:`, error);
    return {
      frontmatter: {},
      content: ''
    };
  }
}

// For the US Government fiscal year
// Oct-Dec = 1
// Jan-Mar = 2
// Apr-Jun = 3
// Jul-Sep = 4
function getQuarter(d?: Date) {
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

export function sortBySeason(array: Tfrontmatter[]) {
  const season = getQuarter();

  array.sort(function (m1:any, m2:any) {
    var n1 = m1.season,
      n2 = m2.season;
    if (n1 < season) {
      n1 = n1 + 12;
    }
    if (n2 < season) {
      n2 = n2 + 12;
    }
    return n1 - n2;
  });
  console.log('sortBySeason',array);

  return array;
}

export function sortByMonth(array: Tfrontmatter[]) {
  const months = ["januar", "februar", "marts", "april", "maj", "juni", "juli", "august", "september", "oktober", "november", "december"];

  const monthsArray = new Array()

  months.forEach(month => {
    monthsArray.push(array.filter(a => a.slug === month)[0]);
  })

  console.log('sortByMonth',monthsArray);

  return monthsArray;
}
