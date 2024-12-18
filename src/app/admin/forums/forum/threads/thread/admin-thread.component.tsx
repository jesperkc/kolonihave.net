"use client";
import Link from "next/link";
import { getPostAndCommentsByPostId, updatePostAndComments } from "../../../../../../../components/clientside-data";
import { EventHandler, useEffect, useState } from "react";
import { IPostAndComments, TPost } from "../../../../../../types/post.types";
import { useForm } from "react-hook-form";
import ReactDOM from "react-dom";
import React from "react";
import { TComment } from "../../../../../../types/comment.types";

type Tdata = {
  post: TPost;
  comments: TComment[];
};

function ThreadAdminComponent({ threadId, users }) {
  const [data, setData] = useState<Tdata>();
  const { register, handleSubmit, reset } = useForm();
  useEffect(() => {
    const fetchDataUseEffect = async () => {
      const response: IPostAndComments = await getPostAndCommentsByPostId(threadId);
      setData(response);
    };
    if (threadId) fetchDataUseEffect();
  }, [threadId]);

  // effect runs when user state is updated
  useEffect(() => {
    // reset form with user data
    reset(data);
    if (data) {
      getcreatorDisplayNames(data);
    }
  }, [data]);

  const getUser = (id) => {
    console.log("users", users, id);
    const user = users.filter((user) => user.uid === id);
    return user.length ? user[0] : null;
  };
  const getcreatorDisplayNames = (data: Tdata) => {
    if (data && data.post.creatorId) {
      const postCreator = getUser(data.post.creatorId);
      data.post.creatorDisplayName = postCreator ? postCreator.displayName : "";

      data.comments = data.comments.map((comment) => {
        const postCreator = getUser(comment.creatorId);
        return { ...comment, creatorDisplayName: postCreator ? postCreator.displayName : "" };
      });
    }
  };

  const onSubmit = async (data: Tdata) => {
    getcreatorDisplayNames(data);
    console.log("onSubmit", data);

    const saved = await updatePostAndComments({ ...data });
    console.log(saved);
  };

  const userPicker = (userid, selectname) => {
    return (
      <select {...register(selectname)} defaultValue={userid}>
        <option>Vælg bruger</option>
        {users.map((user) => (
          <option key={user.uid} value={user.uid}>
            {user.displayName}
          </option>
        ))}
      </select>
    );
  };

  return (
    <div className="forums">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="admin-table admin-threads-table">
          {data && data.post && (
            <div className="table-row">
              <div className="table-col">
                {userPicker(data.post.creatorId, `post.creatorId`)}
                <br />
                {data.post.creatorDisplayName}
              </div>
              <div className="table-col">
                <input type="text" defaultValue={data.post.title} {...register(`post.title`)} />
                <br />
                <textarea defaultValue={data.post.description}></textarea>
              </div>
            </div>
          )}
          {data &&
            data.comments &&
            data.comments.map((t: any, index: number) => {
              const fieldName = `comments[${index}]`;
              return (
                <div className="table-row" key={t.id}>
                  <div className="table-col">
                    {userPicker(t.creatorId, `${fieldName}.creatorId`)}
                    <br />
                    {t.creatorDisplayName}
                  </div>
                  <div className="table-col">
                    <textarea defaultValue={t.comment}></textarea>
                  </div>
                </div>
              );
            })}
        </div>
        <br />
        <br />
        <button type="submit">Gem</button>
      </form>
    </div>
  );
}

export default ThreadAdminComponent;
