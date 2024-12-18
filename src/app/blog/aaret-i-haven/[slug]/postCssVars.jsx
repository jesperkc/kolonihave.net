"use client";
import { useEffect } from "react";

const PostCssVars = ({ meta }) => {
  useEffect(() => {
    if (meta.backgroundColor) {
      document.documentElement.style.setProperty("--backgroundColorLight", meta.backgroundColor);
      document.documentElement.style.setProperty("--backgroundColorDark", meta.color);
    }
    if (meta.color) {
      document.documentElement.style.setProperty("--headlineColorLight", meta.color);
      document.documentElement.style.setProperty("--headlineColorDark", meta.backgroundColor);
    }

    return () => {
      document.documentElement.style.setProperty("--backgroundColorLight", "");
      document.documentElement.style.setProperty("--backgroundColorDark", "");
      document.documentElement.style.setProperty("--headlineColorLight", "");
      document.documentElement.style.setProperty("--headlineColorDark", "");
    };
  }, []);
};

export default PostCssVars;
