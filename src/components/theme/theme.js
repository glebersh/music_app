import { extendTheme } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';

const breakpoints = {
  xs: "320px",
  s: "480px",
  md: "768px",
  lg: "960px",
  xl: "1200px",
  xll: "1440px"
};

const theme = extendTheme({
  styles: {
    global: (props) => ({
      body: {
        bg: mode('white', '#101010')(props),
        color: mode('black', 'white')(props),
      },
    })
  },
  breakpoints,
  colors: {
    "gray": {
      "50": "#F0F2F4",
      "100": "#D6DBE0",
      "200": "#BCC4CD",
      "300": "#A2ADB9",
      "400": "#8896A5",
      "500": "#6D7F92",
      "600": "#576675",
      "700": "#424C57",
      "800": "#2C333A",
      "900": "#16191D"
    },
    "primary": "#db295f",
    "black": "#000000",
    "pureWhite": "#FFFFFF",
    config: {
      initialColorMode: 'light',
      useSystemColorMode: true,
    }
  }
});

export default theme;