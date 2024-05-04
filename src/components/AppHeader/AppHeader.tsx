import React, { useContext, useEffect, useRef, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import {
  triggerApplicationListAPI,
  useApplicationList,
} from "Slices/FetchProjectStatus";
import { useDispatch } from "react-redux";
import { ApplicationStatusResponse } from "types";
import {
  DashboardTabContext,
  DashboardTabContextType,
} from "Context/tabSelected";

const AppHeader = () => {
  const { status, data } = useApplicationList();
  const dispatch = useDispatch();
  const appBarRef = useRef<HTMLDivElement>(null);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { selectedApp, handleAppChange } = useContext(
    DashboardTabContext
  ) as DashboardTabContextType;

  useEffect(() => {
    apiCall();
  }, []);

  useEffect(() => {
    if (status === "fetched") {
      handleAppChange(data?.[0] as ApplicationStatusResponse);
    }
  }, [status]);

  const apiCall = () => {
    dispatch(triggerApplicationListAPI() as any);
  };

  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (selectedMenu?: ApplicationStatusResponse) => {
    if (selectedMenu) {
      handleAppChange(selectedMenu);
    }
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  if (status !== "fetched") return null;

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
          <Box display="flex" alignItems="center" onClick={handleClick}>
            <Typography variant="subtitle1" noWrap component="div">
              {selectedApp?.name ?? "none selected"}
            </Typography>
            <KeyboardArrowDownIcon />
          </Box>

          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={() => handleClose()}
          >
            {data?.map((app, idx) => (
              <MenuItem
                selected={app.name === selectedApp?.name}
                key={idx + app?.name}
                onClick={() => handleClose(app)}
              >
                {app?.name}
              </MenuItem>
            ))}
          </Menu>
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
