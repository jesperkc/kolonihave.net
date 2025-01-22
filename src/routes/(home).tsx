import { For } from "solid-js";
import { findSectionPosts, getMonthlyPost, posts } from "~/data/posts";
import MonthlyBlog from "~/components/blog/monthly-blog";
import LinkArrowSvg from "/src/assets/svg/icon-linkarrow.svg";
import VegestableIllustrationSvg from "/public/images/illustrations/illustration-vegestables.svg";

const backgroundImage = "/images/heroes/hero-cosy-communal-garden-in-wintertime-with-bonfire-96141.jpg";
const Homepage = () => {
  const inspirationposts = findSectionPosts("inspiration")?.slice(0, 5);
  const currentMonthlyPost = getMonthlyPost();
  return (
    <div>
      <div
        class="hero"
        style={{
          "--backgroundImage": `url(${backgroundImage})`,
        }}
      >
        <main>
          <div class="landingpage-grid">
            <div class="grid-column">
              <div class="wobble-border landingpage-box">
                <div class="flex space-between">
                  <div class="level-left">
                    <h5>Inspiration</h5>
                  </div>
                  <div class="level-right">
                    <a href={"/blog/inspiration"}>
                      Se alle <LinkArrowSvg />
                    </a>
                  </div>
                </div>
                <ul class="dash-list">
                  <For each={inspirationposts}>
                    {(item, index) => (
                      <li>
                        <a href={`/blog/inspiration/${item.slug}`}>{item.title}</a>
                      </li>
                    )}
                  </For>
                </ul>
              </div>
              {/* <div class="wobble-border" style={{ "--backgroundColorBox": "#fff2dd" }}>
                <h5>Tip</h5>
                {isClient ? getRandomTip() : ""}
              </div> */}
            </div>
            <div class="grid-column column-right">
              <MonthlyBlog {...currentMonthlyPost} />
              <div class="landingpage-hero-illustration">
                <VegestableIllustrationSvg />
              </div>
            </div>
          </div>

          {/* <Allotments /> */}
        </main>
      </div>
      <main>
        {/* <div class="mdx wobble-border"> */}
        {/* <h1>{props.livet.meta.title}</h1>
          <h2>{props.livet.meta.desc}</h2>
          <MDXRemote source={props.livet.content} /> */}
        {/* </div> */}
      </main>
    </div>
  );
};

export default Homepage;
