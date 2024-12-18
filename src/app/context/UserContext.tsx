"use client";
import { useRouter } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";
import { TUser } from "../../types/user.types";
import { getUsers } from "../functions/serverside/serverside-functions";

// Create context
const UsersContext = createContext({});
// Make context available across the app by exporting it
export const useUsers = () => useContext<any>(UsersContext);

// Create the context provider
export const UsersContextProvider = ({ children }: { children: React.ReactNode }) => {
  // Define the constants for the user and loading state
  const [users, setUsers] = useState<TUser | null>(null);
  const [loading, setLoading] = useState<Boolean>(true);

  useEffect(() => {
    setLoading(true);

    loadUsers();
  }, []);

  const loadUsers = async () => {
    // const users = await getUsers();
    // setLoading(false);
    // setUsers(users);
  };

  // Wrap the children with the context provider
  return <UsersContext.Provider value={{ users, loadUsers, loading }}>{children}</UsersContext.Provider>;
};
