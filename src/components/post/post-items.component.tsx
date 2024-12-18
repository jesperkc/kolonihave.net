"use client";
import { useRouter, useSearchParams } from "next/navigation";

import { useEffect, useState } from "react";
import { getPostAndCommentsByPostId, getPostAndCommentsByThreadSlug } from "../../../components/clientside-data";
import PostItem from "./post-item.component";
import CommentItem from "../comments/comment-item.component";
import { TComment } from "../../types/comment.types";
import CommentInput from "../comments/comment-input.component";
import { IPostAndComments } from "../../types/post.types";

interface IProps {
  forum: {
    id: string;
  };
  threadslug: string;
}

const PostItems: React.FC<IProps> = ({ forum, threadslug }) => {
  const [posts, setPosts] = useState<any>(null);

  const params = useSearchParams();

  // const postId = postId;//params?.get("id");
  console.log("PostItems", forum, threadslug);
  const fetchDataUseEffect = async () => {
    const response: IPostAndComments = await getPostAndCommentsByThreadSlug(threadslug);
    setPosts(response);
  };
  const onNewComment = () => {
    console.log("onNewComment");
    fetchDataUseEffect();
  };
  useEffect(() => {
    const fetchDataUseEffect = async () => {
      const response: IPostAndComments = await getPostAndCommentsByThreadSlug(threadslug);
      setPosts(response);
    };
    if (threadslug) fetchDataUseEffect();
  }, [threadslug]);
  return (
    <div>
      {posts && posts.post && <PostItem post={posts.post} />}
      <hr />
      {posts && posts.comments && posts.comments.map((comment: TComment) => <CommentItem key={comment.id} comment={comment} />)}
      <hr />
      <CommentInput onNewComment={onNewComment} forum={forum} />
    </div>
  );
};

export default PostItems;
