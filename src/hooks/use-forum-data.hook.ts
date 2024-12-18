"use client";
import { collection, doc, getDoc, getDocs, increment, writeBatch } from "firebase/firestore";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";
import { useRecoilState } from "recoil";
// import { auth, firestore } from '../firebase/config.firebase'
import { auth, db } from "../app/firebase.config";
import authModalStateAtom from "../recoil/atoms/auth-modal.atom";
import forumSnippetStateAtom from "../recoil/atoms/forum.atom";
import { TForum, TForumSnippet } from "../types/forum.types";

const useForumData = () => {
  const {
    query: { forumId },
  } = useRouter();

  const [user] = useAuthState(auth);

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [forumState, setForumState] = useRecoilState(forumSnippetStateAtom);

  const [, setModalState] = useRecoilState(authModalStateAtom);

  const getForumData = useCallback(
    async (forumId: string) => {
      const forumRef = doc(db, "communities", forumId);
      try {
        const forumSnap = await getDoc(forumRef);

        if (forumSnap.exists()) {
          setForumState((prevState) => ({
            ...prevState,
            currentForum: {
              id: forumSnap.id,
              ...forumSnap.data(),
            } as TForum,
          }));
        }
      } catch (error) {
        toast.error("Cannot get community data.");
        console.log("getForumData error");
        console.log(error);
      }
    },
    [setForumState]
  );

  const joinForum = async (forumData: TForum) => {
    setIsLoading(true);

    const forumSnippetsRef = doc(db, `users/${user?.uid}/communitySnippets`, forumData.id);
    const forumRef = doc(db, `communities`, forumData.id);

    const batch = writeBatch(db);

    const newForumData = {
      forumId: forumData.id,
      isModerator: false,
    };

    batch.set(forumSnippetsRef, newForumData);

    batch.update(forumRef, {
      numberOfMembers: increment(1),
    });

    try {
      /* // 1) Update firebase
                Update communitySnippets
                Update community memebers */
      await batch.commit();

      // 2) Update Recoil state
      setForumState((prevState) => ({
        ...prevState,
        mySnippets: [...prevState.mySnippets, newForumData],
      }));
    } catch (error) {
      toast.error("Cannot join community. Refresh the page and try again.");
      console.log("joinForum error");
      console.log(error);
    }

    setIsLoading(false);
  };

  const leaveCommunity = async (forumId: string) => {
    setIsLoading(true);
    const forumSnippetsRef = doc(db, `users/${user?.uid}/communitySnippets`, forumId);
    const forumRef = doc(db, `communities`, forumId);

    const batch = writeBatch(db);

    batch.delete(forumSnippetsRef);

    batch.update(forumRef, { numberOfMembers: increment(-1) });

    try {
      /* // 1) Update firebase
                delete community from communitySnippets
                Decrement community memebers */
      await batch.commit();

      // 2) Update Recoil state
      setForumState((prevState) => ({
        ...prevState,
        mySnippets: prevState.mySnippets.filter((forumData) => forumData.forumId !== forumId),
      }));
    } catch (error) {
      toast.error("Cannot leave the community. Refresh the page and try again.");
      console.log("leaveCommunity error");
      console.log(error);
    }
    setIsLoading(false);
  };

  const communityMembershipToggle = (forumData: TForum, isJoined: boolean) => {
    // if not signed in, show sign in modal
    if (!user)
      return setModalState((prevState) => ({
        ...prevState,
        view: "logIn",
        open: true,
      }));

    if (isJoined) confirm("Are you sure?") && leaveCommunity(forumData.id);
    else joinForum(forumData);
  };

  const getUsersCommunitySnippets = useCallback(async () => {
    setIsLoading(true);
    try {
      const communitySnippetSnap = await getDocs(collection(db, `users/${user?.uid}/communitySnippets`));
      const data = communitySnippetSnap.empty
        ? []
        : (communitySnippetSnap.docs.map((document) => ({
            ...document.data(),
          })) as TForumSnippet[] | []);

      setForumState((prevState) => ({
        ...prevState,
        mySnippets: data,
        fetchedSnippets: true,
      }));
    } catch (error) {
      toast.error("Error getting users communities, please refresh.");
      console.log("getUsersCommunitySnippets error");
      console.log(error);
    }
    setIsLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.uid]);

  useEffect(() => {
    if (!user) {
      setIsLoading(false);
      setForumState((prevState) => ({
        ...prevState,
        mySnippets: [],
        fetchedSnippets: false,
      }));
    } else getUsersCommunitySnippets();
  }, [user, getUsersCommunitySnippets, setForumState]);

  useEffect(() => {
    if (!forumState.currentForum && forumId) getForumData(forumId as string);
  }, [forumId, forumState.currentForum, getForumData]);

  return {
    isLoading,
    communityState: forumState,
    communityMembershipToggle,
  };
};

export default useForumData;
