"use server";
import { writeBatch } from "firebase/firestore";
import { firebaseAdmin } from "../../firebase-admin.config";

const generateHash = () => {
  let characters = "0123456789abcdef";
  let str = "";
  for (let i = 0; i < 6; i++) {
    str += characters[Math.floor(Math.random() * 16)];
  }
  return str;
};

export const getForums = async () => {
  try {
    const forums = (await firebaseAdmin.firestore().collection("communities").get()).docs;

    const forumsData = forums.map((com) => {
      const data = com.data();
      // console.log("com", com.id);
      return {
        id: com.id,
        name: data.name,
        slug: data.slug,
      };
    });

    return forumsData;
  } catch (err) {
    // either the `token` cookie didn't exist
    // or token verification failed
    // either way: redirect to the login page
    console.log("serversideAuth err");

    // `as never` prevents inference issues
    // with InferGetServerSidePropsType.
    // The props returned here don't matter because we've
    // already redirected the user.
    return {} as never;
  }
};

export const getForum = async (uid?: string) => {
  if (!uid) return {};
  try {
    const forum = await firebaseAdmin
      .firestore()
      .collection("communities")
      .doc(uid ?? "")
      .get();

    const data = forum.data();
    // console.log("com", com.id);
    return {
      id: forum.id,
      name: data?.name,
      slug: data?.slug,
    };
  } catch (err) {
    // either the `token` cookie didn't exist
    // or token verification failed
    // either way: redirect to the login page
    console.log("getForum err", err);

    // `as never` prevents inference issues
    // with InferGetServerSidePropsType.
    // The props returned here don't matter because we've
    // already redirected the user.
    return {} as never;
  }
};

export const getForumBySlug = async (slug: string) => {
  console.log("getForumBySlug slug", slug);
  try {
    const forum = await firebaseAdmin.firestore().collection("communities").where("slug", "==", slug).get();

    let returndata;

    forum.forEach((f) => {
      console.log("getForumBySlug f", f.id, f.data());
      const data = f.data();

      returndata = {
        id: f.id,
        name: data.name,
        slug: data.slug,
      };
    });
    console.log("getForumBySlug", returndata);
    return returndata;
  } catch (err) {
    // either the `token` cookie didn't exist
    // or token verification failed
    // either way: redirect to the login page
    console.log("getForumBySlug err", err);

    // `as never` prevents inference issues
    // with InferGetServerSidePropsType.
    // The props returned here don't matter because we've
    // already redirected the user.
    return {} as never;
  }
};

export const getThreads = async ({ forumId }: { forumId: string }) => {
  try {
    const threads = (await firebaseAdmin.firestore().collection("posts").where("forumId", "==", forumId).get()).docs;

    const threadsData = threads.map((com) => {
      const data = com.data();
      // console.log("com", com.id);
      return {
        id: com.id,
        title: data.title,
        creatorDisplayName: data.creatorDisplayName,
        forumId: data.forumId,
      };
    });

    return threadsData;
  } catch (err) {
    // either the `token` cookie didn't exist
    // or token verification failed
    // either way: redirect to the login page
    console.log("getThreads error", err);

    // `as never` prevents inference issues
    // with InferGetServerSidePropsType.
    // The props returned here don't matter because we've
    // already redirected the user.
    return {} as never;
  }
};

/** USERS */

export const getUser = async (uid: string) => {
  let returnUsersResult: any = {};
  console.log("getUsers");
  return firebaseAdmin
    .auth()
    .getUsers([{ uid: uid }])
    .then((getUsersResult) => {
      console.log("getUsersResult:", getUsersResult);
      getUsersResult.users.forEach((userRecord) => {
        console.log(userRecord);
        returnUsersResult = userRecord;
      });

      console.log("Unable to find users corresponding to these identifiers:");
      getUsersResult.notFound.forEach((userIdentifier) => {
        console.log(userIdentifier);
      });

      return returnUsersResult;
    })
    .catch((error) => {
      console.log("Error fetching user data:", error);
      return {} as never;
    });
};

export const getUsers = async () => {
  const returnUsersResult: any[] = [];
  console.log("getUsers");
  return (
    firebaseAdmin
      .auth()
      .listUsers()
      // .getUsers([
      //   // { uid: 'uid1' },
      //   // { email: "jesperkc@gmail.com" },
      //   { customClaims: ["admin"]}
      //   // { providerId: 'google.com', providerUid: 'google_uid4' },
      // ])
      .then((getUsersResult) => {
        console.log("getUsersResult:", getUsersResult);
        getUsersResult.users.forEach((userRecord) => {
          console.log(userRecord);
          returnUsersResult.push(userRecord);
        });

        return returnUsersResult;
      })
      .catch((error) => {
        console.log("Error fetching user data:", error);
        return {} as never;
      })
  );
};

interface ICreateUser {
  displayName: string;
  email: string;
  customClaims: { ai: boolean };
}

interface ISaveUser extends ICreateUser {
  uid: string;
}

const updateDisplayNames = async ({ uid, displayName }) => {
  // POSTS

  const threads = (await firebaseAdmin.firestore().collection("posts").where("creatorId", "==", uid).get()).docs;

  const batch = firebaseAdmin.firestore().batch();
  const threadsData = threads.map((doc) => {
    batch.update(doc.ref, { creatorDisplayName: displayName });
  });

  await batch.commit();

  // COMMENTS
  {
    const threads = (await firebaseAdmin.firestore().collection("comments").where("creatorId", "==", uid).get()).docs;

    const batch = firebaseAdmin.firestore().batch();
    const threadsData = threads.map((doc) => {
      batch.update(doc.ref, { creatorDisplayName: displayName });
    });

    await batch.commit();
  }
  return;
};

export const saveUser = async ({ uid, displayName, email, customClaims }: ISaveUser) => {
  return firebaseAdmin
    .auth()
    .updateUser(uid, {
      email: email,
      displayName: displayName,
    })
    .then(async (userRecord) => {
      if (customClaims) {
        await firebaseAdmin.auth().setCustomUserClaims(userRecord.uid, { ai: customClaims.ai });
      }

      await updateDisplayNames({ uid, displayName });

      // See the UserRecord reference doc for the contents of userRecord.
      return {
        uid: userRecord.uid,
        email: userRecord.email,
        displayName: userRecord.displayName,
      };
    });
};

export const createUser = async ({ displayName, email, customClaims }: ICreateUser) => {
  console.log("createUser serverside", { displayName, email, customClaims });

  return firebaseAdmin
    .auth()
    .createUser({
      email: email,
      displayName: displayName,
    })
    .then(async (userRecord) => {
      if (customClaims) {
        await firebaseAdmin.auth().setCustomUserClaims(userRecord.uid, { ai: customClaims.ai });
      }

      // See the UserRecord reference doc for the contents of userRecord.
      return {
        uid: userRecord.uid,
        email: userRecord.email,
        displayName: userRecord.displayName,
      };
    });
};

export const getAiUsers = async () => {
  try {
    let usersData: any[] = [];
    const users = await firebaseAdmin
      .auth()
      .listUsers()

      .then((getUsersResult) => {
        console.log("getUsersResult:", getUsersResult);
        getUsersResult.users.forEach((userRecord) => {
          console.log(userRecord);
          usersData.push({
            id: userRecord.uid,
            displayName: userRecord.displayName,
          });
        });
      })
      .catch((error) => {
        console.log("Error fetching user data:", error);
        return {} as never;
      });

    return usersData;
  } catch (err) {
    // either the `token` cookie didn't exist
    // or token verification failed
    // either way: redirect to the login page
    console.log("serversideAuth err");

    // `as never` prevents inference issues
    // with InferGetServerSidePropsType.
    // The props returned here don't matter because we've
    // already redirected the user.
    return {} as never;
  }
};

export const getAiUser = async (id: string) => {
  try {
    const output = await firebaseAdmin.firestore().collection("users").doc(id).get();

    const data = output.data();
    console.log("id", id);
    console.log("data", data);
    return {
      uid: output.id,
      displayName: data?.displayName,
    };
  } catch (err) {
    // either the `token` cookie didn't exist
    // or token verification failed
    // either way: redirect to the login page
    console.log("serversideAuth err");

    // `as never` prevents inference issues
    // with InferGetServerSidePropsType.
    // The props returned here don't matter because we've
    // already redirected the user.
    return {} as never;
  }
};

export const setJesperAsAdmin = async (a?: any) => {
  try {
    const userRef = await firebaseAdmin.auth().setCustomUserClaims("FfUyvcTRrQeoWkP2rvPzfyENHQ82", { admin: true });

    console.log("setJesperAsAdmin", userRef);
    return { success: true };
  } catch (err) {
    // either the `token` cookie didn't exist
    // or token verification failed
    // either way: redirect to the login page
    console.log("setJesperAsAdmin error:", err);

    // `as never` prevents inference issues
    // with InferGetServerSidePropsType.
    // The props returned here don't matter because we've
    // already redirected the user.
    return { error: true } as never;
  }
};
