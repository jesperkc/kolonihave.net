"use client";
import { useRouter } from "next/navigation";
import nookies from "nookies";
import React, { createContext, useContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
// import { auth } from "../../../firebase";
import { auth, db } from "../firebase.config";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";

// User data type interface
interface UserType {
  email: string | null;
  uid: string | null;
  displayName: string | null;
  profile: any | null;
  checked: boolean;
}

// Create auth context
const AuthContext = createContext({});
// Make auth context available across the app by exporting it
export const useAuth = () => useContext<any>(AuthContext);

// Create the auth context provider
export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  // Define the constants for the user and loading state
  const [user, setUser] = useState<UserType>({ email: null, uid: null, displayName: null, profile: null, checked: false });
  const [loading, setLoading] = useState<Boolean>(true);
  const router = useRouter();

  // Update the state depending on auth
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userSnap = await getDoc(doc(db, "users", user.uid));
        const userProfile = userSnap.exists() ? userSnap.data() : {};
        const userObj = {
          email: user.email,
          uid: user.uid,
          displayName: user.displayName,
          profile: userProfile,
          checked: true,
        };
        const token = await user.getIdToken();
        nookies.set(undefined, "token", token, { path: "/" });
        setUser(userObj);
      } else {
        nookies.set(undefined, "token", "", { path: "/" });
        setUser({ email: null, uid: null, displayName: null, profile: null, checked: true });
      }
    });

    setLoading(false);

    return () => unsubscribe();
  }, []);

  // Sign up the user
  const signUp = (email: string, password: string, displayName: string) => {
    return createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
      console.log("signUp error");
      console.log(userCredential);
      return updateProfile(userCredential.user, { displayName: displayName });
    });
  };

  // Update user
  const updateUser = (displayName: string) => {
    console.log("updateUser", displayName);
    if (auth.currentUser) {
      return updateProfile(auth.currentUser, { displayName });
    }
    return;
  };

  // const getUserProfile = (uid: string) => {
  //     const userDoc = doc(db, "users", uid);
  //     return { ...userDoc };
  // };

  const updateUserProfile = (displayName: string) => {
    if (auth.currentUser) {
      const userDoc = doc(db, "users", auth.currentUser.uid);
      return setDoc(userDoc, { displayName });
    }
    return;
  };

  // Login the user
  const logIn = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Logout the user
  const logOut = async () => {
    setUser({ email: null, uid: null, displayName: null, profile: null, checked: false });
    await signOut(auth);

    return router.push("/");
  };

  // Wrap the children with the context provider
  return (
    <AuthContext.Provider value={{ user, signUp, logIn, logOut, updateUser, updateUserProfile }}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};
