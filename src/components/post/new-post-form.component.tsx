"use client";
import { Flex, ToastId } from "@chakra-ui/react";
import { addDoc, collection, doc, serverTimestamp, setDoc, Timestamp } from "firebase/firestore";
import type { StorageError } from "firebase/storage";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useToast } from "@chakra-ui/react";
// import { auth, firestore } from '../../firebase/config.firebase'
import { auth, db } from "../../app/firebase.config";
// import useSelectMedia from "../../hooks/use-select-media.hook";
// import useUploadFile from "../../hooks/use-upload-file.hook";
import { TPost } from "../../types/post.types";
import TextInputs from "./text-inputs.component";
import { useAuth } from "../../app/context/AuthContext";

const formTabs = [
  {
    title: "Post",
    icon: "IoDocumentText",
  },
  {
    title: "Image & Video",
    icon: "IoImagesOutline",
  },
];

interface IProps {
  forum: {
    id: string;
    slug: string;
    name: string;
  };
}

const NewPostForm: React.FC<IProps> = ({ forum }) => {
  const [formData, setFormData] = useState<{
    title: string;
    description: string;
  }>({ title: "", description: "" });

  // const [{ mediaFile, mediaString, overSizeMediaError, mediaType }, handleSelectMedia, handleRemoveMedia] = useSelectMedia();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<null | StorageError>(null);

  const router = useRouter();
  const toast = useToast();
  const toastIdRef = useRef<any>(null);
  // const [{ isUploading, progress }, uploadFile] = useUploadFile();

  const { user } = useAuth();

  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setFormData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));

  const handleSubmitPost = async () => {
    console.log("user", user);
    if (!user) {
      router.push("/login");
      return;
    }
    if (!formData.description || !formData.title) {
      toast({ description: "Du mangler titel eller tekst" });
      console.log("Du mangler titel eller tekst");
      return;
    }
    setIsLoading(true);
    setError(null);

    const newPost: Omit<TPost, "ID"> = {
      forumId: forum.id as string,
      createdAt: serverTimestamp() as Timestamp,
      creatorId: user.uid,
      creatorDisplayName: user.displayName ?? user.email!.split("@")[0],
      description: formData.description,
      title: formData.title,
      numberOfComments: 0,
      slug: ""
    };

    const postRef = collection(db, `posts`);

    toastIdRef.current = toast({ status: "loading", description: "Sender..." });
    try {
      const postDocRef = await addDoc(postRef, newPost);

      // if (mediaFile && !overSizeMediaError) {
      // const mediaURL = await uploadFile(mediaFile, `posts/${router.query.forumId}/${postDocRef.id}`);
      // const postReturnRef = doc(db, "posts", postDocRef.id);
      // await setDoc(postReturnRef, { merge: true });
      // }

      toast.update(toastIdRef.current, { status: "success", description: "Indlægget er oprettet - du viderestilles nu" });
      router.push(`/forum/${forum.slug}`);
    } catch (error) {
      setError(error as StorageError);
      toast.update(toastIdRef.current, { status: "error", description: "Der skete en fejl" });
      console.log("handleSubmitPost error");
      console.log(error);
    }

    setIsLoading(false);
  };

  return (
    <Flex width="100%" paddingBottom="10px">
      <TextInputs
        formData={formData}
        handleFormChange={handleFormChange}
        handleSubmitPost={handleSubmitPost}
        isLoading={isLoading}
        // isUploading={isUploading}
        // progress={progress}
      />
    </Flex>
  );
};

export default NewPostForm;
