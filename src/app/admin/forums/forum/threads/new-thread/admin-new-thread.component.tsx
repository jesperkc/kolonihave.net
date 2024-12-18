"use client";
import Link from "next/link";
import { getPostAndCommentsByPostId, savePostAndComments } from "../../../../../../../components/clientside-data";
import { useEffect, useState } from "react";
import { IPostAndComments, TNewPost, TPost } from "../../../../../../types/post.types";
import { Button, Select } from "@chakra-ui/react";
import { useUsers } from "../../../../../context/UserContext";
import PostItem from "../../../../../../components/post/post-item.component";
import { Timestamp } from "@firebase/firestore";
import { TComment } from "../../../../../../types/comment.types";
import CommentItem from "../../../../../../components/comments/comment-item.component";
import { addMinutes } from "../../../../../helpers/datetime";

function ThreadAdminNewComponent({ forumId, users }) {
  const [post, setPost] = useState<TNewPost>();
  const [json, setJson] = useState<any>(null);
  const [date, setDate] = useState<any>(null);
  const [time, setTime] = useState<any>(null);
  const [title, setTitle] = useState<any>(null);
  const [comments, setComments] = useState<TComment[]>();
  const [inc, setInc] = useState<any>(0);

  const getUser = (id) => {
    console.log("users", users, id);
    return users.filter((user) => user.id === id);
  };

  const parseJson = (parsedJson) => {
    const commentsArray: any[] = [];
    let timestamp = date ? new Date(`${date} ${time}`) : new Date();
    parsedJson.forEach((message, i) => {
      const commentUser = getUser(message.userId);
      console.log("commentUser", commentUser);
      const createdAt = Timestamp.fromDate(timestamp);
      if (i === 0) {
        // setPost({
        //   createdAt: createdAt,
        //   creatorId: message.userId.toString(),
        //   creatorDisplayName: commentUser.length ? commentUser[0].displayName : null,
        //   forumId: forumId,
        //   numberOfComments: parsedJson.length - 1,
        //   title: title,
        //   description: message.message,
        // });
      } else {
        commentsArray.push({
          createdAt: createdAt,
          creatorId: message.userId.toString(),
          creatorDisplayName: commentUser.length ? commentUser[0].displayName : null,
          forumId: forumId,
          comment: message.message,
          postId: null,
        });
      }

      timestamp = addMinutes(timestamp, Math.floor(Math.random() * 30) + 15);
    });
    setComments(commentsArray);
  };

  const save = async () => {
    const saved = await savePostAndComments({ post, comments });
    console.log(saved);
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

  return (
    <div className="forums">
      <input
        type="date"
        name="date"
        onChange={(e) => {
          setDate(e.target.value);
        }}
      />
      <input
        type="time"
        name="time"
        onChange={(e) => {
          setTime(e.target.value);
        }}
      />
      <input
        type="text"
        name="title"
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      />
      <textarea
        onChange={(e) => {
          setJson(e.target.value);
        }}
      >
        {json}
      </textarea>
      <div className="">
        {post && <PostItem post={post} />}
        <hr />
        {comments && comments.map((comment: TComment) => <CommentItem key={comment.id} comment={comment} />)}
      </div>
      <br />
      <br />

      <Button onClick={save}>Gem</Button>
    </div>
  );
}

export default ThreadAdminNewComponent;
