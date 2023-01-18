import "@emotion/react";

declare module "@emotion/react" {
  export interface Theme {
    colors: {
      primary: {
        blue: "#053C5E";
        lightBlue: "#BFDBF7";
        red: "#A31621";
        black: "#141201";
      };
      secondary: {
        brown: "#2A0800";
        veryLightGrey: "#AEB4A9";
        ligthGrey: "#4C5C68";
        grey: "#2D3439";
      };
    };
  }
}
