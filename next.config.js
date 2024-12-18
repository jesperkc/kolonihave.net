/** @type {import('next').NextConfig} */
const path = require("path");
const withMDX = require("@next/mdx")();

const nextConfig = {
  // output: "export",

  images: {
    unoptimized: true,
  },

  // Optional: Change links `/me` -> `/me/` and emit `/me.html` -> `/me/index.html`
  // trailingSlash: true,

  // Optional: Prevent automatic `/me` -> `/me/`, instead preserve `href`
  // skipTrailingSlashRedirect: true,

  // Optional: Change the output directory `out` -> `dist`
  distDir: 'out',
  sassOptions: {
    includePaths: [path.join(__dirname, "src/app")],
  },
  // Configure `pageExtensions`` to include MDX files
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
  // Optionally, add any other Next.js config below

  webpack: (config, { isServer }) => {
    // Fixes npm packages that depend on `fs` module
    config.module.rules.push({
      test: /\.svg$/i,
      // use: ['@svgr/webpack'],
      use: [
        {
          loader: "@svgr/webpack",
          options: {
            svgoConfig: {
              plugins: [
                {
                  name: "preset-default",
                  params: {
                    overrides: {
                      cleanupIds: false,
                      removeViewBox: false,
                    },
                  },
                },
                "removeXMLNS",
              ],
            },
          },
        },
      ],
    });

    // const nextExportImageLoader = config.module.rules.find((props) => {
    //   console.log("----------");
    //   console.log(props);
    //   if (props.use) {
    //     console.log("------");
    //     console.log(props.use);
    //     if (props.use.length > 0) {
    //       console.log("----", props.use.length);
    //       const str = JSON.stringify(props.use[0]);
    //       console.log(str);
    //       if (str) {
    //         if (str.indexOf("next-export-optimize-images-loader") > -1) {
    //           return props.use;
    //         }
    //       }
    //       // console.log(props.use[0].loader === "next-export-optimize-images-loader");
    //     }
    //   }
    //   return false; //use && use.length > 0 && use[0].loader === "next-export-optimize-images-loader";
    // });
    // if (nextExportImageLoader) {
    //   console.log("------ **** CHANGE");
    //   nextExportImageLoader.test = /\.(png|jpg|jpeg|gif|webp|avif|ico|bmp)$/i; // Removed only svg
    // }
    // if (!isServer) {
    //   config.node = {
    //     fs: "empty",
    //   };
    // }
    return config;
  },
};

// module.exports = withMDX(nextConfig);
module.exports = nextConfig;
