import { extendTheme, theme, defineStyle } from "@chakra-ui/react";

const whiteFormSettings = {
  bg: "white",
  color: "black.300",
  _focus: {
    bg: "white",
  },
  // _autofill: {
  //   border: "1px solid transparent",
  //   textFillColor: "#c6c6c6",
  //   boxShadow: "0 0 0px 1000px #232323 inset",
  //   transition: "background-color 5000s ease-in-out 0s",
  // },
};

const whiteForm = defineStyle({
  defaultProps: {
    // size: "lg", // default is md
    variant: "sm", // default is solid
    // colorScheme: "green", // default is gray
  },
  baseStyle: {
    field: whiteFormSettings,
  },
});

// 2. Add your color mode config
const customTheme = extendTheme(theme, {
  initialColorMode: "system",
  useSystemColorMode: true,
  colors: {
    primary: "#201D29",
  },
  components: {
    Input: whiteForm,
    Textarea: {
      defaultProps: whiteForm.defaultProps,
      baseStyle: whiteForm.baseStyle.field,
    },
    Button: {
      baseStyle: {
        // ...define your base styles
        background: "green.500",
        color: "white",
        fontWeight: "normal",
      },
      variants: {
        // Make a variant, we'll call it `base` here and leave it empty
        base: {},
        secondary: {
          //...define other variants
        },
      },
      defaultProps: {
        // Then here we set the base variant as the default
        variant: "base",
      },
    },
  },
});

export default customTheme;
