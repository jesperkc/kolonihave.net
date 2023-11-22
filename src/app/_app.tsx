import SharedLayout from "../../pages/layout";

export default function RootLayout({ Component, pageProps }) {
  return (
    <SharedLayout>
      <Component {...pageProps} />
    </SharedLayout>
  );
}
