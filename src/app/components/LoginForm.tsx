"use client";
import { useForm, SubmitHandler, Controller, Form } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import {
  Box,
  Button,
  ButtonGroup,
  Container,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  Stack,
  useToast,
} from "@chakra-ui/react";

const formSchema = z.object({
  email: z.string().email({ message: "Indtast venligst en gyldig e-mail adresse" }),
  password: z.string().min(6, { message: "Kodeordet skal minimum være 8 karaktere" }),
});

type FormValues = z.infer<typeof formSchema>;

const defaultValues: FormValues = {
  email: "",
  password: "",
};

const LoginForm = () => {
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

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  // Use the signIn method from the AuthContext
  const { logIn } = useAuth();
  const router = useRouter();
  const toast = useToast();
  const searchParams = useSearchParams();

  const onSubmit: SubmitHandler<FormValues> = async (values) => {
    console.log(values);
    // return new Promise((resolve) => {
    //   setTimeout(() => {
    //     alert(JSON.stringify(values, null, 2));
    //     resolve(values);
    //   }, 3000);
    // });
    const loggedInUser = logIn(values.email, values.password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        console.log("loggedInUser", user);
        router.refresh();
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        toast({ status: "error", description: errorMessage });
        // ..
      });
    // const getRedirect = searchParams?.get("redirect");
    // router.push("/profil/");
  };

  const handleReset = () => {
    reset(defaultValues);
  };

  // const handleLogin = async (e: any) => {
  //   e.preventDefault();

  //   // Disable submit button until all fields are filled in
  //   const canSubmit = [...Object.values(allData)].every(Boolean);
  //   if (!canSubmit) {
  //     return false;
  //   }
  //   try {
  //     await logIn(data.email, data.password);
  //     // const getRedirect = searchParams?.get("redirect");
  //     router.push("/profil/");
  //   } catch (error: any) {
  //     console.log(error.message);
  //   }
  // };

  // Destructure data from the data object
  const { ...allData } = data;

  return (
    <Box as="form" minW={300} maxW={"90vw"} w={"50%"} my={"50"} onSubmit={handleSubmit(onSubmit)} className="group">
      <Stack gap={4}>
        <h5>Log ind</h5>
        <FormControl isInvalid={!!errors.email}>
          <FormLabel>E-mail</FormLabel>
          <Input type="email" {...register("email")} />
          <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.password}>
          <FormLabel>Kodeord</FormLabel>
          <Input type="password" {...register("password")} />
          <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
        </FormControl>

        <ButtonGroup gap="4">
          <Button className="button" type="submit" isLoading={isSubmitting}>
            Log ind
          </Button>
          <Link className="button button-outline" href="/profil/signup">
            Register
          </Link>
        </ButtonGroup>
      </Stack>
    </Box>
  );
};

export default LoginForm;
