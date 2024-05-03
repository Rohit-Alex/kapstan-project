import { createTheme, ThemeProvider } from "@mui/material";
import React, { PropsWithChildren } from "react";
import { BrowserRouter } from "react-router-dom";

declare module "@mui/material/styles" {
  interface Palette {
    white: string;
  }
  interface PaletteOptions {
    white?: string;
  }
}

const theme = createTheme({
  palette: {
    white: "#fff ",
  },
});

const AllProvider: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>{children}</BrowserRouter>
    </ThemeProvider>
  );
};

export default AllProvider;
