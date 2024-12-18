import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { Fauna_One } from "next/font/google";
import { Providers } from "./providers";
import theme from "./theme";
import Nav from "./components/nav";
import Head from "next/head";
import "/src/app/style/globals.css";
import "/src/app/style/style.scss";
import { AuthContextProvider } from "./context/AuthContext";

const fauna_font = Fauna_One({ subsets: ["latin"], weight: "400", variable: "--font-fauna-one" });

export default function RootLayout({ children, user, pageProps, auth }) {
  return (
    <html lang="en" className={`${fauna_font.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="32x32" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.webmanifest" />
        {/* <link rel="stylesheet" href="https://use.typekit.net/ifv8bnn.css"></link> */}
      </head>
      <body>
        <div className="page-wrapper">
          <AuthContextProvider>
            {/* <ColorModeScript initialColorMode={theme.config.initialColorMode}  /> */}
            <Providers>
              <Nav user={user} />
              {children}
              {auth}
            </Providers>
          </AuthContextProvider>
        </div>
      </body>
    </html>
  );
}
// import type { Metadata } from "next";
