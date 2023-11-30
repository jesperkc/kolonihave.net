"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { auth } from "../../../firebase";

// User data type interface
interface UserType {
  displayName: string | null;
  email: string | null;
  uid: string | null;
}

// Create auth context
const AuthContext = createContext({});

// Make auth context available across the app by exporting it
export const useAuth = () => useContext<any>(AuthContext);

// Create the auth context provider
export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  // Define the constants for the user and loading state
  const [user, setUser] = useState<UserType>({ displayName: null, email: null, uid: null });
  const [loading, setLoading] = useState<Boolean>(true);

  // Update the state depending on auth
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("user", user);
      if (user) {
        setUser({
          displayName: user.displayName,
          email: user.email,
          uid: user.uid,
        });
      } else {
        setUser({ displayName: null, email: null, uid: null });
      }
    });

    setLoading(false);

    return () => unsubscribe();
  }, []);

  // Sign up the user
  const signUp = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Update user
  const updateUser = (displayName: string) => {
    console.log("updateUser", displayName);
    if (auth.currentUser) {
      return updateProfile(auth.currentUser, { displayName });
    }
    return;
  };

  // Login the user
  const logIn = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Logout the user
  const logOut = async () => {
    setUser({ displayName: null, email: null, uid: null });
    return await signOut(auth);
  };

  // Wrap the children with the context provider
  return <AuthContext.Provider value={{ user, signUp, logIn, logOut, updateUser }}>{loading ? null : children}</AuthContext.Provider>;
};
