import Link from "next/link";
import { getMdxFiles, getMdx, getUrls, sortBySeason } from "../lib/load-posts";
import LinkArrowSvg from "/src/assets/svg/icon-linkarrow.svg";
import LeafsSvg from "/public/images/illustrations/colored-illustration-leafs.svg";

function Custom404(props) {
  const inspirationposts = props.inspiration.posts;

  return (
    <main>
      <h3>Siden kunne desværre ikke findes</h3>
      <br />
      <br />
      <div className="landingpage-grid">
        <div className="grid-column">
          <div className="wobble-border landingpage-box">
            <div className="level">
              <div className="level-left">
                <h5>Inspiration</h5>
              </div>
              <div className="level-right">
                <Link href={"blog/inspiration"}>
                  Se alle <LinkArrowSvg />
                </Link>
              </div>
            </div>

            <ul className="dash-list">
              {inspirationposts.map((advice) => (
                <li key={advice.url}>
                  <Link href={`${advice.url}`}>{advice.meta.title}</Link>
                </li>
              ))}
            </ul>
          </div>
          {/* <div className="wobble-border" style={{ "--backgroundColorBox": "#fff2dd" }}>
                <h5>Tip</h5>
                {isClient ? getRandomTip() : ""}
              </div> */}
        </div>
        <div className="grid-column column-right"></div>
      </div>

      {/* <img src="/images/illustrations/colored-illustration-leafs.svg" style={{ marginTop: 60 }} alt="illustration" /> */}
      <LeafsSvg style={{ marginTop: 60, maxWidth: "100%", height: "auto" }} />
    </main>
  );
}

export const getStaticProps = async ({ params }) => {
  const paths = [
    {
      id: "quicktips",
      path: "database/quicktips/",
      sort: false,
    },
    {
      id: "inspiration",
      path: "database/blog/inspiration/",
      sort: true,
    },
  ];
  const urls = [
    {
      id: "heroes",
      path: "public/images/heroes/",
    },
  ];

  const returnData = {};

  const months = ["januar", "februar", "marts", "april", "maj", "juni", "juli", "august", "september", "oktober", "november", "december"];
  returnData.monthlypost = await getMdx(`database/blog/aaret-i-haven/`, `${months[new Date().getMonth()]}.mdx`);
  returnData.livet = await getMdx(`database/blog/`, `kolonihavelivet.mdx`);
  // const mdxSource = await serialize(returnData.livet.content, {
  //   // Optionally pass remark/rehype plugins
  //   mdxOptions: {
  //     remarkPlugins: [],
  //     rehypePlugins: [],
  //   },
  //   scope: returnData.livet.data,
  // });

  // returnData.livet.source = mdxSource;

  for (const element of urls) {
    returnData[element.id] = await getUrls(element.path);
  }

  for (const element of paths) {
    // get all MDX files
    let postFilePaths = await getMdxFiles(element.path);

    if (element.sort) {
      postFilePaths.posts = sortBySeason(postFilePaths.posts);
    }
    returnData[element.id] = postFilePaths;
  }
  return {
    props: returnData,
    // enable ISR
    // revalidate: 60,
  };
};

export default Custom404;
