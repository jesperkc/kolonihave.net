import { query } from "@solidjs/router";

export const getPosts = query(async () => {
  // "use server";
  return [{slug: "jesper", title: 'title'}]
  // return await getJsonFile();
}, "posts");
