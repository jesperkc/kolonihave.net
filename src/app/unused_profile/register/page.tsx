import RegistrationForm from "../components/RegistrationForm";
import Head from "next/head";

const Register = () => {
  return (
    <>
      <Head>
        <title>Register - Firebase Authentication With Next.js</title>
        <meta
          name="description"
          content="Learn how to implement Google Firebase Authentication in your React, Next.js, TypeScript projects."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="m-0 min-h-screen bg-gradient-to-br from-primary-color to-blue-400 px-4">
        <RegistrationForm />
      </main>
    </>
  );
};

export default Register;
