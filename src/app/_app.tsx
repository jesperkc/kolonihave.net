import SharedLayout from "../../components/layout";

export default function RootLayout({ Component, pageProps }) {
  return (
    <SharedLayout>
      <Component {...pageProps} />
    </SharedLayout>
  );
}
