import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      light: "#9778ce",
      main: "#7e57c2",
      dark: "#583c87",
      contrastText: "#fff",
    },
    secondary: {
      light: "#9e9e9e",
      main: "#3c3e44",
      dark: "#202329",
      contrastText: "#000",
    },
  },
});

export default theme;
