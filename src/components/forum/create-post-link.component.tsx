"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { useAuth } from "../../app/context/AuthContext";
import { Button } from "@chakra-ui/react";

const CreatePostLink = ({ slug }) => {
  const router = useRouter();
  const { user } = useAuth();
  // const user = null;

  const handleChangeRoute = () => {
    console.log("user", user);
    if (!user) {
      console.log("!user");
      router.push(`/login`);
    } else {
      router.push(`/forum/${slug}/opret`);
    }
  };
  return (
    <Button className="button" onClick={handleChangeRoute} disabled={user.checked === false}>
      Opret indlæg
    </Button>
  );
};
export default CreatePostLink;
