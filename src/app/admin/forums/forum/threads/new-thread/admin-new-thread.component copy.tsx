"use client";
import Link from "next/link";
import { getPostAndCommentsByPostId } from "../../../../../../../components/clientside-data";
import { useEffect, useState } from "react";
import { IPostAndComments } from "../../../../../../types/post.types";
import { Button, Select } from "@chakra-ui/react";
import { useUsers } from "../../../../../context/UserContext";

function ThreadAdminNewComponent({ forumId, users }) {
  const [post, setPost] = useState<any>({ title: "titel", description: "" });
  const [json, setJson] = useState<any>(null);
  const [comments, setComments] = useState<any>(null);
  const [inc, setInc] = useState<any>(0);

  const getUser = (id) => {
    console.log("users", users, id);
    return users.filter((user) => user.id === id);
  };

  const parseJson = (parsedJson) => {
    const commentsArray: any[] = [];
    parsedJson.messages.forEach((message, i) => {
      const commentUser = getUser(message.userId);
      const createdAt = null;
      if (i === 0) {
        setPost({
          createdAt: createdAt,
          creatorId: commentUser.id,
          creatorDisplayName: commentUser.length ? commentUser[0].displayName : null,
          forumId: forumId,
          numberOfComments: parsedJson.messages.length,
          title: message.title,
          description: message.description,
        });
      } else {
        commentsArray.push({
          id: `id-${i}`,
          createdAt: createdAt,
          creatorId: commentUser.id,
          creatorDisplayName: commentUser.length ? commentUser[0].displayName : null,
          forumId: forumId,
          comment: message.comment,
          postId: null,
        });
      }
    });
    setComments(commentsArray);
  };

  useEffect(() => {
    try {
      const parsedJson = JSON.parse(json);
      console.log("parsedJson", parsedJson);

      parseJson(parsedJson);
    } catch (error) {
      console.log(error);
    }
  }, [json]);

  // const addComment = () => {
  //   const commentsArray = comments ? [...comments] : [];
  //   commentsArray.push({
  //     id: `id-${inc}`,
  //     creatorDisplayName: null,
  //     comment: "new",
  //   });
  //   setComments(commentsArray);
  //   setInc(inc + 1);
  // };
  // const deleteComment = (i) => {
  //   const commentsArray = [...comments];
  //   commentsArray.splice(i, 1);
  //   setComments(commentsArray);
  // };
  return (
    <div className="forums">
      <textarea
        onChange={(e) => {
          setJson(e.target.value);
        }}
      >
        {json}
      </textarea>
      <div className="">
        <div className="">
          <br />
          {post.title}
          <br />
          {post.description}
        </div>
        {comments &&
          comments.map((t: any, i) => (
            <div key={t.id}>
              <div>
                {t.id}
                <br />
                {t.creatorDisplayName}
                <br />
                {t.comment}
                <br />
                {/* <Button
                  onClick={() => {
                    deleteComment(i);
                  }}
                >
                  Slet
                </Button> */}
              </div>
            </div>
          ))}
        <br />
        <br />
        {/* <Button onClick={addComment}>Tilføj kommentar</Button> */}
      </div>
      <br />
      <br />
    </div>
  );
}

export default ThreadAdminNewComponent;
