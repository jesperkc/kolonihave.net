import { cookies, headers } from "next/headers";
import nookies from "nookies";
import { firebaseAdmin } from "../firebase-admin.config";

async function getCookieData() {
  const cookieData = cookies().get("token");
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve(cookieData);
    }, 1000)
  );
}

export const serversideAuthInApp = async (ctx) => {
  const tokencookie = await getCookieData();

  console.log("serversideAuth", tokencookie);

  try {
    const cookies = nookies.get(ctx);
    const token = await firebaseAdmin.auth().verifyIdToken(cookies.token);
    const user = await firebaseAdmin.auth().getUser(token.uid);
    const userProfile = (await firebaseAdmin.firestore().collection("users").doc(token.uid).get()).data();
    // the user is authenticated!
    const { uid, email } = user;

    console.log("serversideAuth userProfile", userProfile);
    // FETCH STUFF HERE!! 🚀

    return {
      user: {
        uid,
        email,
        profile: userProfile
          ? {
              displayName: userProfile.displayName,
            }
          : {},
      },
    };
  } catch (err) {
    // either the `token` cookie didn't exist
    // or token verification failed
    // either way: redirect to the login page
    console.log("serversideAuth err", err);

    // ctx.res.writeHead(302, { Location: "/profil/login?redirect=" + redirect });
    // ctx.res.end();

    return {
      redirect: {
        destination: "/profil/login?redirect=",
        permanent: false,
      },
      props: {},
    };

    // `as never` prevents inference issues
    // with InferGetServerSidePropsType.
    // The props returned here don't matter because we've
    // already redirected the user.
    return {} as never;
  }
};

export const serversideAuth = async (ctx, settings?) => {
  let redirect = ctx.resolvedUrl;
  console.log("serversideAuth", redirect);

  try {
    const cookies = nookies.get(ctx);

    const token = await firebaseAdmin.auth().verifyIdToken(cookies.token);
    const user = await firebaseAdmin.auth().getUser(token.uid);
    const userProfile = (await firebaseAdmin.firestore().collection("users").doc(token.uid).get()).data();
    // the user is authenticated!
    const { uid, email } = user;

    console.log("serversideAuth userProfile", userProfile);
    // FETCH STUFF HERE!! 🚀

    return {
      props: {
        user: {
          uid,
          email,
          profile: userProfile
            ? {
                displayName: userProfile.displayName,
              }
            : {},
        },
      },
    };
  } catch (err) {
    // either the `token` cookie didn't exist
    // or token verification failed
    // either way: redirect to the login page
    console.log("serversideAuth err");

    // ctx.res.writeHead(302, { Location: "/profil/login?redirect=" + redirect });
    // ctx.res.end();

    return {
      redirect: {
        destination: "/profil/login?redirect=" + redirect,
        permanent: false,
      },
      props: {},
    };

    // `as never` prevents inference issues
    // with InferGetServerSidePropsType.
    // The props returned here don't matter because we've
    // already redirected the user.
    return {} as never;
  }
};
