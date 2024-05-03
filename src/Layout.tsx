import React, { PropsWithChildren, useState } from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";

import AppDrawer from "components/AppDrawer";
import AppHeader from "components/AppHeader";

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  const [appBarSize, setAppBarSize] = useState({ width: 0, height: 0 });

  const handleSetAppHeaderDimensions = (val: any) => {
    setAppBarSize(val);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <AppDrawer />
      <Box flex={1}>
        <CssBaseline />
        <AppHeader handleSetDimensions={handleSetAppHeaderDimensions} />

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 2,
            height: `calc(100vh - ${appBarSize.height}px)`,
            overflow: "scroll",
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
