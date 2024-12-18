import {
  OrderByDirection,
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  where,
  writeBatch,
} from "firebase/firestore";
import { db, auth } from "../src/app/firebase.config";
import { TForum } from "../src/types/forum.types";
import { TUser } from "../src/types/user.types";
import { firebaseAdmin } from "../src/app/firebase-admin.config";

const caseFoldNormalize = function (s) {
  return s.normalize("NFKC").toLowerCase().toUpperCase().toLowerCase();
};

interface IGetForums {
  orderForumsBy?: [string, OrderByDirection];
}

export const getForums = async (params?: IGetForums) => {
  console.log("getForums", params);
  try {
    const listingsRef = collection(db, "communities");

    const q = query(
      listingsRef,
      params && params.orderForumsBy ? orderBy(params.orderForumsBy[0], params.orderForumsBy[1]) : orderBy("createdAt", "desc")
    );

    const querySnap = await getDocs(q);

    let listings: any = [];
    querySnap.forEach((doc) => {
      return listings.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    console.log("getForums", listings);

    return listings;
  } catch (err) {
    // either the `token` cookie didn't exist
    // or token verification failed
    // either way: redirect to the login page
    console.log("getForums error", err);

    // `as never` prevents inference issues
    // with InferGetServerSidePropsType.
    // The props returned here don't matter because we've
    // already redirected the user.
    return {} as never;
  }
};

export const saveForum = async ({ id, name, slug, user }: { id: string; name: string; slug: string; user: any }) => {
  let returnValues = {
    forum: {
      id: id,
      name: name,
      slug: slug.toLowerCase(),
    },
    error: null,
  };
  console.log("saveForum", id, name, slug, user);
  try {
    if (id) {
      const forumRef = await setDoc(
        doc(db, "communities", id),
        {
          name: name,
          name_insensitive: caseFoldNormalize(name),
          slug: slug.toLowerCase(),
        },
        { merge: true }
      );
    } else {
      const newForumDoc = {
        creatorName: user.displayName ?? user.email!.split("@")[0],
        creatorId: user?.uid,
        createdAt: serverTimestamp(),
        name: name,
        name_insensitive: caseFoldNormalize(name),
        slug: slug.toLowerCase(),
      };
      console.log("newForumDoc", newForumDoc);
      const newForum = await addDoc(collection(db, "communities"), newForumDoc);
      returnValues.forum.id = newForum.id;
    }
  } catch (error) {
    // either the `token` cookie didn't exist
    // or token verification failed
    // either way: redirect to the login page
    console.log("saveForum error", error);

    // `as never` prevents inference issues
    // with InferGetServerSidePropsType.
    // The props returned here don't matter because we've
    // already redirected the user.
    throw TypeError("Der skete en fejl");
  }
  return returnValues;
};

export const saveAiUser = async ({ uid, displayName }) => {
  try {
    const batch = writeBatch(db);
    if (uid) {
      const forumRef = await setDoc(
        doc(db, "users", uid),
        {
          displayName: displayName,
          roles: ["ai"],
        },
        { merge: true }
      );

      // await updateDisplayNames({ uid, displayName });
    } else {
      const newForumRef = doc(collection(db, "users"));
      await setDoc(newForumRef, {
        displayName: displayName,
        roles: ["ai"],
        createdAt: serverTimestamp(),
      });
    }
    return {
      displayName: displayName,
    };
  } catch (err) {
    // either the `token` cookie didn't exist
    // or token verification failed
    // either way: redirect to the login page
    console.log("serversideAuth err", err);

    // `as never` prevents inference issues
    // with InferGetServerSidePropsType.
    // The props returned here don't matter because we've
    // already redirected the user.
    return {} as never;
  }
};

export const getForumBySlug = async (slug) => {
  const q = query(collection(db, "communities"), where("slug", "==", slug));

  try {
    const forumSnaps = await getDocs(q);
    if (!forumSnaps.empty) {
      const snapshot = forumSnaps.docs[0];
      const forumData = snapshot.data();
      const returndata: TForum = {
        id: snapshot.id,
        name: forumData.name,
        slug: forumData.slug,
        createdAt: forumData.createdAt,
      };

      return returndata;
    } else {
      return {} as any;
    }
  } catch (error) {
    console.log("error");
    console.log(error);
    return {} as any;
  }
};

export const getForumIdBySlug = async (slug) => {
  const q = query(collection(db, "communities"), where("slug", "==", slug));

  try {
    const forumSnaps = await getDocs(q);
    if (!forumSnaps.empty) {
      const snapshot = forumSnaps.docs[0];
      const returndata: any = {
        id: snapshot.id,
      };

      return returndata;
    } else {
      return {} as any;
    }
  } catch (error) {
    console.log("error");
    console.log(error);
    return {} as any;
  }
};

export const getPostBySlug = async (slug) => {
  try {
    const postsRef = collection(db, "posts");
    const q = query(postsRef, where("slug", "==", slug), orderBy("createdAt", "asc"), limit(1));

    const querySnap = await getDocs(q);
    // const postDoc = doc(db, "posts", slug);
    // const docSnap = await getDoc(postDoc);

    return { ...querySnap.docs[0].data() };
  } catch (err) {
    // either the `token` cookie didn't exist
    // or token verification failed
    // either way: redirect to the login page
    console.log("getForums error", err);

    // `as never` prevents inference issues
    // with InferGetServerSidePropsType.
    // The props returned here don't matter because we've
    // already redirected the user.
    return {} as never;
  }
};

export const getPostById = async (id) => {
  try {
    const postDoc = doc(db, "posts", id);
    const docSnap = await getDoc(postDoc);

    return { ...docSnap.data(), id: id };
  } catch (err) {
    // either the `token` cookie didn't exist
    // or token verification failed
    // either way: redirect to the login page
    console.log("getForums error", err);

    // `as never` prevents inference issues
    // with InferGetServerSidePropsType.
    // The props returned here don't matter because we've
    // already redirected the user.
    return {} as never;
  }
};

export const getPostAndCommentsByThreadSlug = async (slug) => {
  console.log("getPostAndCommentsByThreadSlug", slug);
  const post = await getPostBySlug(slug);
  const comments: any[] = [];
  try {
    const commentsRef = collection(db, "comments");

    const q = query(commentsRef, where("postId", "==", post.id), orderBy("createdAt", "asc"));

    const querySnap = await getDocs(q);

    querySnap.forEach((doc) => {
      return comments.push({
        id: doc.id,
        ...doc.data(),
      });
    });
  } catch (err) {
    // either the `token` cookie didn't exist
    // or token verification failed
    // either way: redirect to the login page
    console.log("getPostAndCommentsByPostId error", err);

    // `as never` prevents inference issues
    // with InferGetServerSidePropsType.
    // The props returned here don't matter because we've
    // already redirected the user.
  }
  return {
    post: post,
    comments: comments,
  };
};

export const getPostAndCommentsByPostId = async (id) => {
  const post = await getPostById(id);
  const comments: any[] = [];
  try {
    const commentsRef = collection(db, "comments");

    const q = query(commentsRef, where("postId", "==", id), orderBy("createdAt", "asc"));

    const querySnap = await getDocs(q);

    querySnap.forEach((doc) => {
      return comments.push({
        id: doc.id,
        ...doc.data(),
      });
    });
  } catch (err) {
    // either the `token` cookie didn't exist
    // or token verification failed
    // either way: redirect to the login page
    console.log("getPostAndCommentsByPostId error", err);

    // `as never` prevents inference issues
    // with InferGetServerSidePropsType.
    // The props returned here don't matter because we've
    // already redirected the user.
  }
  return {
    post: post,
    comments: comments,
  };
};

export const updatePostAndComments = async ({ post, comments }) => {
  try {
    console.log("updatePostAndComments post", post);

    await setDoc(doc(db, "posts", post.id), post, { merge: true });

    console.log("updatePostAndComments comments", comments);
    comments.forEach(async (comment) => {
      await setDoc(doc(db, "comments", comment.id), comment, { merge: true });
    });

    return { status: "success" };
  } catch (err) {
    // either the `token` cookie didn't exist
    // or token verification failed
    // either way: redirect to the login page
    console.log("updatePostAndComments error", err);
    console.log("updatePostAndComments post", post);
    console.log("updatePostAndComments comments", comments);

    // `as never` prevents inference issues
    // with InferGetServerSidePropsType.
    // The props returned here don't matter because we've
    // already redirected the user.
    return {
      status: "error",
      ...err,
    };
  }
};

export const savePostAndComments = async ({ post, comments }) => {
  try {
    console.log("savePostAndComments post", post);
    const newPost = await addDoc(collection(db, "posts"), post);

    console.log("savePostAndComments comments", comments);
    comments.forEach(async (comment) => {
      comment.postId = newPost.id;
      await addDoc(collection(db, "comments"), comment);
    });

    return { status: "success" };
  } catch (err) {
    // either the `token` cookie didn't exist
    // or token verification failed
    // either way: redirect to the login page
    console.log("savePostAndComments error", err);
    console.log("savePostAndComments post", post);
    console.log("savePostAndComments comments", comments);

    // `as never` prevents inference issues
    // with InferGetServerSidePropsType.
    // The props returned here don't matter because we've
    // already redirected the user.
    return {
      status: "error",
      ...err,
    };
  }
};
