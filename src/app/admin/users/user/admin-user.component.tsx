"use client";
import { useAuth } from "../../../context/AuthContext";
import { saveForum } from "../../../../../components/clientside-data";
import { Box, Button, ButtonGroup, Checkbox, FormControl, FormErrorMessage, FormLabel, Input, Stack, useToast } from "@chakra-ui/react";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForum } from "../../../context/ForumContext";
import { useState } from "react";
import { useUsers } from "../../../context/UserContext";

const formSchema = z.object({
  displayName: z.string().min(2, { message: "Indtast venligst et gyldigt navn (min 2 karakterer)" }),
  email: z.string().email("Indtast venligst en gyldig e-mail"),
  customClaimsAi: z.boolean(),
  // admin: z.boolean(),
});

type FormValues = z.infer<typeof formSchema>;

function UserAdminComponent({ edituser, saveUser, createUser }) {
  const defaultValues: FormValues = {
    displayName: edituser.displayName,
    email: edituser.email,
    customClaimsAi: edituser.customClaims ? edituser.customClaims.ai : false,
    // admin: edituser.customClaims.admin,
  };

  const {
    control,
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const router = useRouter();
  const toast = useToast();
  const { user } = useAuth();
  const { loadUsers } = useUsers();

  const onSubmit: SubmitHandler<FormValues> = async (values) => {
    console.log(values);
    const saveValues = {
      ...values,
      uid: edituser.uid,
    };
    if (!edituser.uid) {
      await createUser(saveValues)
        .then((response) => {
          console.log("response", response);
          toast({ status: "success", description: "Bruger blev oprettet" });
          router.push(`/admin/users/user?id=${response.uid}`);
        })
        .catch((error) => {
          console.log("error", error);
          toast({ status: "error", description: error.message });
        });
    }
    if (edituser.uid) {
      await saveUser(saveValues)
        .then((response) => {
          console.log("response", response);
          toast({ status: "success", description: "Bruger blev rettet" });
          if (!edituser.uid) {
            router.push(`/admin/users/user?id=${response.uid}`);
          }
        })
        .catch((error) => {
          console.log("error", error);
          toast({ status: "error", description: error.message });
        });
    }
    // console.log("return status", status);
    // if (status === "success"){

    // }
    // await saveForum({ id: forum.id, name: values.name, slug: values.slug, user: user })
    //   .then((response) => {
    //     toast({ status: "success", description: "Forum blev oprettet" });
    //     loadForums();
    //     router.push(`/admin/forum?id=${response.forum.id}`);
    //   })
    //   .catch((error) => {
    //     toast({ status: "error", description: error.message });
    //   });
  };

  return (
    <div className="forum">
      <Box as="form" minW={300} maxW={"90vw"} w={"50%"} onSubmit={handleSubmit(onSubmit)}>
        <Stack gap={8}>
          <FormControl isInvalid={!!errors.displayName}>
            <FormLabel>Navn</FormLabel>
            <Input type="text" {...register("displayName")} />
            <FormErrorMessage>{errors.displayName?.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.email}>
            <FormLabel>E-mail</FormLabel>
            <Input type="email" {...register("email")} />
            <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
          </FormControl>

          {/* <FormControl isInvalid={!!errors.admin}>
            <Checkbox {...register("admin")}>Admin</Checkbox>
            <FormErrorMessage>{errors.admin?.message}</FormErrorMessage>
          </FormControl> */}

          <FormControl isInvalid={!!errors.customClaimsAi}>
            <Checkbox {...register("customClaimsAi")}>AI</Checkbox>
            <FormErrorMessage>{errors.customClaimsAi?.message}</FormErrorMessage>
          </FormControl>

          <ButtonGroup>
            <Button className="button" type="submit" isLoading={isSubmitting}>
              Gem
            </Button>
          </ButtonGroup>
        </Stack>
      </Box>
    </div>
  );
}

export default UserAdminComponent;
