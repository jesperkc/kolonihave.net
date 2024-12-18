"use client";
import { useAuth } from "../../../context/AuthContext";
import { saveForum } from "../../../../../components/clientside-data";
import { Box, Button, ButtonGroup, FormControl, FormErrorMessage, FormLabel, Input, useToast } from "@chakra-ui/react";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForum } from "../../../context/ForumContext";

const formSchema = z.object({
  name: z.string().min(3, { message: "Indtast venligst et gyldigt navn (min 3 karakterer)" }),
  slug: z.string().regex(new RegExp(/^[A-Za-z0-9]+(?:-[A-Za-z0-9]+)*$/), "Indtast venligst et gyldigt slug"),
});

type FormValues = z.infer<typeof formSchema>;

function ForumAdminComponent({ forum }) {
  const defaultValues: FormValues = {
    name: forum.name,
    slug: forum.slug,
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
  const { loadForums } = useForum();

  const onSubmit: SubmitHandler<FormValues> = async (values) => {
    console.log(values);

    await saveForum({ id: forum.id, name: values.name, slug: values.slug, user: user })
      .then((response) => {
        toast({ status: "success", description: "Forum blev oprettet" });
        loadForums();
        router.push(`/admin/forum?id=${response.forum.id}`);
      })
      .catch((error) => {
        toast({ status: "error", description: error.message });
      });
  };

  return (
    <div className="forum">
      <Box as="form" minW={300} maxW={"90vw"} w={"50%"} onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={!!errors.name}>
          <FormLabel>Navn</FormLabel>
          <Input type="text" {...register("name")} />
          <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.slug}>
          <FormLabel>Slug</FormLabel>
          <Input type="text" {...register("slug")} />
          <FormErrorMessage>{errors.slug?.message}</FormErrorMessage>
        </FormControl>

        <ButtonGroup gap="4" mt={4}>
          <Button className="button" type="submit" isLoading={isSubmitting}>
            Gem
          </Button>
        </ButtonGroup>
      </Box>
    </div>
  );
}

export default ForumAdminComponent;
