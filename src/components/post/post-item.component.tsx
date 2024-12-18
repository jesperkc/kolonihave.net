"use client";
import { Box, Flex, Icon, Img, Skeleton, Spinner, Stack, Text } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
// import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";
// import { AiOutlineDelete } from "react-icons/ai";
// import { BsChat } from "react-icons/bs";
// import {
//   IoArrowDownCircleOutline,
//   IoArrowDownCircleSharp,
//   IoArrowRedoOutline,
//   IoArrowUpCircleOutline,
//   IoArrowUpCircleSharp,
//   IoBookmarkOutline,
// } from "react-icons/io5";
// import ReactPlayer from "react-player/lazy";
import { useSetRecoilState } from "recoil";
// import { auth } from "../../firebase/config.firebase";
import { auth } from "../../app/firebase.config";
import authModalStateAtom from "../../recoil/atoms/auth-modal.atom";
import postsStateAtom from "../../recoil/atoms/post.atom";
import { TNewPost, TPost } from "../../types/post.types";
import { ChatIcon16, ChatIcon24 } from "../../../components/icons";
import { fromNowString } from "../../app/helpers/datetime";
import ForumPageLayout from "../layout/forum-layout.component";

interface IProps {
  post: TPost | TNewPost;
  // isUserTheCreator: boolean;
  // userVoteValue: 1 | -1 | undefined;
  // handleDeletePost: (post: TPost) => Promise<boolean>;
  // handlePostVote: (post: TPost, voteValue: 1 | -1, forumId: string) => Promise<void>;
  // votesIsLoading: boolean;
  handleSelectPost?: (post: TPost) => void;
  // homePage?: boolean;
}

const PostItem: React.FC<IProps> = ({
  post,
  // isUserTheCreator,
  // userVoteValue,
  // handleDeletePost,
  // handlePostVote,
  // votesIsLoading,
  // handleSelectPost,
  // homePage,
}) => {
  return (
    <ForumPageLayout>
      <div>
        <small>
          {post.creatorDisplayName} skrev for{" "}
          {post.createdAt && (
            <time title={post.createdAt?.toDate().toLocaleString()}>{fromNowString(post.createdAt?.seconds! * 1000)}</time>
          )}
        </small>
        <small>
          <br />
          <br />
          <br />
          {/* <ChatIcon16 className="icon" /> */}
          {post.numberOfComments} kommentarer
        </small>
      </div>
      <>
        <h2>{post.title}</h2>
        <br />

        <div>{post.description}</div>
        {/* {isMediaLoading && post.mediaType === 'image' && (
                        <Skeleton width="100%" height="300px" />
                    )} */}
      </>
    </ForumPageLayout>
  );
};

export default PostItem;
