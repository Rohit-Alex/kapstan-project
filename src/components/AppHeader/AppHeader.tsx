import React, { useEffect, useRef } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";

type PropsType = {
  handleSetDimensions: (val: { width: number; height: number }) => void;
};

const AppHeader: React.FC<PropsType> = ({ handleSetDimensions }) => {
  const appBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (appBarRef && appBarRef.current) {
      const rect = appBarRef.current.getBoundingClientRect();
      handleSetDimensions({ width: rect.width, height: rect.height });
    }
  }, [appBarRef]);

  return (
    <AppBar
      ref={appBarRef}
      position="static"
      sx={{
        background: "unset",
        color: "unset",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <div>
          <Typography variant="body2" noWrap component="div">
            Applications
          </Typography>
          <Typography variant="subtitle1" noWrap component="div">
            tic-tac-toe
          </Typography>
        </div>
        <div className="flex flex-align-center">
          <Avatar sx={{ bgcolor: "#ffd07a" }}>JD</Avatar>
          <Typography variant="body2" ml={1}>
            John Doe
          </Typography>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default AppHeader;
