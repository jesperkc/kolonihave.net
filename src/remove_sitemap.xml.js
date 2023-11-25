import fs from "fs";
import path from "path";
import { serialize } from "next-mdx-remote/serialize";

// export async function getServerSideProps({ res }) {
//   const URL = "http://kolonihave.net";
//   return `<?xml version="1.0" encoding="UTF-8"?>
//    <urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
//      <!-- Add the static URLs manually -->
//      <url>
//        <loc>${URL}</loc>
//      </url>
//      <url>
//        <loc>${URL}/portfolio</loc>
//      </url>
//       <url>
//        <loc>${URL}/blog</loc>
//      </url>
//    </urlset>
//  `;
// }

// export default function SiteMap() {}

const URL = "http://kolonihave.net";

function generateSiteMap(posts) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <!--We manually set the two URLs we know already-->
     <url>
       <loc>https://kolonihave.net</loc>
     </url>
     <url>
       <loc>https://kolonihave.net/blog</loc>
     </url>
     <url>
       <loc>https://kolonihave.net/blog/inspiration</loc>
     </url>
     <url>
       <loc>https://kolonihave.net/blog/aaret-i-haven</loc>
     </url>
     ${posts.map((post) => {
       return `
         <url>
           <loc>${post}</loc>
         </url>
       `;
     })}
   </urlset>
 `;
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ res }) {
  const paths = [
    {
      path: "database/blog/inspiration/",
    },
    {
      path: "database/blog/aaret-i-haven/",
    },
  ];

  const returnData = [];
  for (const element of paths) {
    // get all MDX files
    const postFilePaths = fs.readdirSync(element.path).filter((postFilePath) => {
      return path.extname(postFilePath).toLowerCase() === ".mdx";
    });

    // read the frontmatter for each file
    for (const postFilePath of postFilePaths) {
      const filePath = `${element.path}${postFilePath}`;
      const postFile = fs.readFileSync(filePath, "utf8");

      returnData.push(filePath.replace(".mdx", "").replace("database", URL));
    }
  }

  // We generate the XML sitemap with the posts data
  const sitemap = generateSiteMap(returnData);

  res.setHeader("Content-Type", "text/xml");
  // we send the XML to the browser
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default SiteMap;
