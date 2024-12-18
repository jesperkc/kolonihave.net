"use client";
import { Box, Button, Flex, FormControl, FormLabel, Text, Textarea, useToast } from "@chakra-ui/react";
import AuthButtons from "../right-content/auth-buttons.component";
import { useState } from "react";
import { useAuth } from "../../app/context/AuthContext";
import ForumPageLayout from "../layout/forum-layout.component";
import { Timestamp, collection, doc, increment, serverTimestamp, writeBatch } from "firebase/firestore";
import { db } from "../../app/firebase.config";
import { TComment } from "../../types/comment.types";
import { useSearchParams, useParams } from "next/navigation";

interface IProps {
  onNewComment: () => void;
  forum: {
    id: string;
  };
  // comment: string;
  // setComment: (comment: string) => void;
  // user: User | undefined | null;
  // createLoading: boolean;
  // handleCreateComment: (comment: string) => void;
}

const CommentInput: React.FC<IProps> = ({ onNewComment, forum }) => {
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  useParams;
  const params = useParams();
  const searchParams = useSearchParams();
  const postId = searchParams?.get("id");
  const { user } = useAuth();
  const toast = useToast();
  const handleCreateComment = async () => {
    console.log("comment", comment);
    console.log("postId", postId);

    if (!user) return;
    if (!postId) return;
    setLoading(true);
    const batch = writeBatch(db);

    const newCommentRef = doc(collection(db, "comments"));
    const postRef = doc(db, "posts", postId);

    const newComment: TComment = {
      id: newCommentRef.id,
      comment,
      forumId: forum.id,
      createdAt: serverTimestamp() as Timestamp,
      creatorDisplayName: user.displayName ?? user.email!.split("@")[0],
      creatorId: user.uid,
      postId: postId,
    };

    // 1) Create comment document on comments collection
    batch.set(newCommentRef, newComment);
    // 2) Increase the number of comments on post documents
    batch.update(postRef, { numberOfComments: increment(1) });

    try {
      await batch.commit();

      newComment.createdAt = { seconds: Date.now() } as Timestamp;
      onNewComment && onNewComment();
      setComment("");
    } catch (error) {
      toast({ status: "error", description: "Cannot create a new comment right now." });
      console.log("handleCreateComment error");
      console.log(error);
    }

    setLoading(false);
  };

  if (user && user.checked == false) {
    return <div>...</div>;
  }
  return (
    <ForumPageLayout>
      <></>
      <>
        {user && user.checked == true ? (
          <>
            <h6 className="mb-1">Skriv en kommentar</h6>
            <small className="mb-1">Du er logget ind som {user?.email?.split("@")[0]}</small>
            <br />
            <br />
            <FormControl isRequired>
              <Textarea value={comment} onChange={(event) => setComment(event.target.value)} height={comment ? "160px" : "60px"} />
            </FormControl>

            {/* <textarea
              value={comment}
              onChange={(event) => setComment(event.target.value)}
              placeholder="Hvad er din kommentar?"
              // minHeight="160px"
              style={{ minHeight: comment ? 160 : 60 }}
              className="textarea"
            /> */}
            <Flex justify="flex-end" p="20px 0px">
              <Button className="button" disabled={!comment.length} onClick={() => handleCreateComment()}>
                Send
              </Button>
            </Flex>
          </>
        ) : (
          <Flex align="center" justify="space-between" borderRadius={2} p={4} gap={4}>
            <Text fontWeight={600}>Log in or sign up to leave a comment</Text>
            <AuthButtons />
          </Flex>
        )}
      </>
    </ForumPageLayout>
  );
};

export default CommentInput;
