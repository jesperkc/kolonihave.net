import SharedLayout from "../src/app/layout";

export default function RootLayout({ Component, pageProps }) {
  return (
    <SharedLayout>
      <Component {...pageProps} />
    </SharedLayout>
  );
}
