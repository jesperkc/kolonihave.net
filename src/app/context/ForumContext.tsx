"use client";
import { useRouter } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";
// import { auth } from "../../../firebase";
import { getForums } from "../../../components/clientside-data";
import { IForumState } from "../../recoil/atoms/forum.atom";
import { TForum } from "../../types/forum.types";

// User data type interface
interface UserType {
  email: string | null;
  uid: string | null;
  profile: any | null;
  checked: boolean;
}

// Create forum context
const ForumContext = createContext({});
// Make forum context available across the app by exporting it
export const useForum = () => useContext<any>(ForumContext);

// Create the forum context provider
export const ForumContextProvider = ({ children }: { children: React.ReactNode }) => {
  // Define the constants for the user and loading state
  const [forums, setForums] = useState<TForum[] | null>(null);
  const [loading, setLoading] = useState<Boolean>(true);
  const router = useRouter();

  // Update the state depending on forum
  useEffect(() => {
    setLoading(true);

    loadForums();
  }, []);

  const getForumBySlug = (slug) => {
    const forum = forums?.filter((f) => f.slug === slug);
    return forum?.length ? forum[0] : null;
  };

  const loadForums = async () => {
    console.log("loadForums", loading);
    const forums = await getForums({ orderForumsBy: ["name_insensitive", "asc"] });
    setForums(forums);
    setLoading(false);
  };

  // Wrap the children with the context provider
  return <ForumContext.Provider value={{ forums, getForumBySlug, loadForums, loading }}>{children}</ForumContext.Provider>;
};
