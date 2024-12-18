"use client";
import { ReactNode } from "react";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import customTheme from "./theme";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ChakraProvider resetCSS theme={customTheme}>
      {children}
    </ChakraProvider>
  );
}
