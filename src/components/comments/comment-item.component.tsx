"use client";
import { Box, Flex, Icon, Img, Skeleton, Spinner, Stack, Text } from "@chakra-ui/react";

import { ChatIcon24 } from "../../../components/icons";
import { TComment } from "../../types/comment.types";
import { fromNowString } from "../../app/helpers/datetime";
import ForumPageLayout from "../layout/forum-layout.component";
import { useAuth } from "../../app/context/AuthContext";
interface IProps {
  comment: TComment;
}

const CommentItem: React.FC<IProps> = ({ comment }) => {
  const { user } = useAuth();
  return (
    <ForumPageLayout>
      <div>
        <small>
          {user.uid === comment.creatorId ? "Du" : comment.creatorDisplayName} skrev
          <br />
          <time title={comment.createdAt?.toDate().toLocaleString()}>{fromNowString(comment.createdAt?.seconds! * 1000)}</time>
        </small>
      </div>

      <div>{comment.comment}</div>
    </ForumPageLayout>
  );
};

export default CommentItem;
