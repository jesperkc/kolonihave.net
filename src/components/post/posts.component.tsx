import { collection, getDocs, limit, orderBy, query, where } from "firebase/firestore";
import { v4 as uuid } from "uuid";
import { db } from "../../app/firebase.config";
import { TPost } from "../../types/post.types";
import PostPreview from "./post-preview.component";

interface IProps {
  id: string;
}

const getPosts = async (id) => {
  const postsRef = collection(db, "posts");

  const postsQuery = query(postsRef, where("forumId", "==", id), orderBy("createdAt", "desc"), limit(20));

  try {
    const postsSnap = await getDocs(postsQuery);
    const posts: TPost[] = postsSnap.docs.map((postObj) => {
      const postData = postObj.data() as Omit<TPost, "ID">;
      return {
        ID: postObj.id,
        ...JSON.parse(JSON.stringify(postData)),
      };
    });
    console.log("posts", posts);
    return posts;
  } catch (error) {
    console.log("getPosts error");
    console.log(error);
    return null;
  }
};

const Posts: React.FC<IProps> = async ({ id }) => {
  // TODO: Add pagination

  // const [user] = useAuthState(auth);

  // const { query: routeQuery } = useRouter();
  const postsState = await getPosts(id);
  console.log("postsState", postsState);

  return (
    <div className="mb-2">
      {postsState && postsState.length ? postsState.map((postObj) => <PostPreview key={uuid()} post={postObj} />) : <div>Ingen indlæg</div>}
    </div>
  );
};

export default Posts;
