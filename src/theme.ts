import { Theme } from "@emotion/react";

export const theme: Theme = {
  colors: {
    primary: {
      blue: "#053C5E",
      blue_pressed: "#04314E",
      blue_hover: "#064874",
      lightBlue: "#BFDBF7",
      lightBlue_pressed: "#92C2F2",
      red: "#A31621",
      black: "#141201",
      white: "#FFFFFF"
    },
    secondary: {
      brown: "#2A0800",
      veryLightGrey: "#AEB4A9",
      ligthGrey: "#4C5C68",
      grey: "#2D3439",
    },
  },
  font: {
    family: {
      title: 'Aquire',
      text: 'Poppins',
    },
    size: {
      main_title: "6rem",
      title: "4rem",
      text: "2rem"
    }
  },
  radius: {
    small: "8px",
    medium: "16px",
    big: "32px",
  },
  border: {
    regular: "2px solid "
  }
};
