"use client";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { TPost } from "../../types/post.types";
import { fromNowString } from "../../app/helpers/datetime";

interface IProps {
  post: TPost;
}

const PostPreview: React.FC<IProps> = ({ post }) => {
  const params = useParams();
  const slug = params?.slug;

  return (
    <div className="post-preview">
      <Link href={`/forum/${slug}/${post.slug}/`}>
        <h5>{post.title}</h5>
      </Link>
      <br />

      <small>
        Skrevet af {post.creatorDisplayName} &#8226; {fromNowString(post.createdAt?.seconds! * 1000)} &#8226;{" "}
        {/* <ChatIcon16 className="icon" /> */}
        {post.numberOfComments} kommentarer
      </small>
    </div>
  );
};

export default PostPreview;
