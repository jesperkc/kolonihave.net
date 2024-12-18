import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import Router from "next/router";
// import NProgress from 'nprogress'
import { useEffect } from "react";
// import { Toaster } from 'react-toastify'
import { RecoilRoot } from "recoil";
// import theme from '../chakra/theme'
import "../style.css";

function MyApp({ Component, pageProps }: AppProps) {
  // useEffect(() => {
  //     const handleRouteStart = () => NProgress.start()
  //     const handleRouteDone = () => NProgress.done()

  //     Router.events.on('routeChangeStart', handleRouteStart)
  //     Router.events.on('routeChangeComplete', handleRouteDone)
  //     Router.events.on('routeChangeError', handleRouteDone)

  //     return () => {
  //         Router.events.off('routeChangeStart', handleRouteStart)
  //         Router.events.off('routeChangeComplete', handleRouteDone)
  //         Router.events.off('routeChangeError', handleRouteDone)
  //     }
  // }, [])

  // useEffect(() => {
  //     printASCII()
  // }, [])
  return (
    <RecoilRoot>
      {/* <ChakraProvider theme={theme}> */}
      <ChakraProvider>
        dsfsdfdsf
        <Component {...pageProps} />
        sdfdsfsdf
        {/* <Toaster /> */}
      </ChakraProvider>
    </RecoilRoot>
  );
}

export default MyApp;
