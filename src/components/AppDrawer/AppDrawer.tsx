import React, { useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import GridViewIcon from "@mui/icons-material/GridView";
import LinkIcon from "@mui/icons-material/Link";
import MoneyOffIcon from "@mui/icons-material/MoneyOff";
import ShieldOutlinedIcon from "@mui/icons-material/ShieldOutlined";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import UnfoldLessDoubleIcon from "@mui/icons-material/UnfoldLessDouble";
import LensOutlinedIcon from "@mui/icons-material/LensOutlined";
import { useTheme } from "@mui/material";

const sideBarMenus = [
  {
    title: "Applications",
    icon: <GridViewIcon sx={{ color: "white" }} />,
    showDivider: true,
  },
  {
    title: "Connections",
    icon: <LinkIcon sx={{ color: "white" }} />,
  },
  {
    title: "Cost",
    icon: <MoneyOffIcon sx={{ color: "white" }} />,
  },
  {
    title: "Security",
    icon: <ShieldOutlinedIcon sx={{ color: "white" }} />,
    showDivider: true,
  },
];

const AppDrawer: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const theme = useTheme();

  const handleExpansion = () => {
    setIsExpanded((prev) => !prev);
  };

  const drawer = (
    <div>
      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <LensOutlinedIcon sx={{ color: "white" }} />
            </ListItemIcon>
            {isExpanded && (
              <ListItemText primary="Kapstan" sx={{ color: "white" }} />
            )}
          </ListItemButton>
        </ListItem>
      </List>
      <Divider sx={{ background: "#4d1b95" }} />
      <List>
        {sideBarMenus.map((item, index) => (
          <React.Fragment key={index}>
            <ListItem key={index} disablePadding>
              <ListItemButton>
                <ListItemIcon>{item.icon}</ListItemIcon>
                {isExpanded && (
                  <ListItemText
                    color="white"
                    primary={item.title}
                    sx={{ color: "white" }}
                  />
                )}
              </ListItemButton>
            </ListItem>
            {item.showDivider && <Divider sx={{ background: "#4d1b95" }} />}
          </React.Fragment>
        ))}
      </List>
      <Box position="absolute" bottom={0}>
        <List>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <PersonOutlineIcon sx={{ color: "white" }} />
              </ListItemIcon>
              {isExpanded && (
                <ListItemText primary="Admin" sx={{ color: "white" }} />
              )}
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <BookmarkBorderIcon sx={{ color: "white" }} />
              </ListItemIcon>
              {isExpanded && (
                <ListItemText primary="Docs" sx={{ color: "white" }} />
              )}
            </ListItemButton>
          </ListItem>
        </List>
        <Divider sx={{ background: "#4d1b95" }} />
        <ListItem disablePadding>
          <ListItemButton sx={{ justifyContent: "flex-end" }}>
            <ListItemIcon onClick={handleExpansion}>
              <UnfoldLessDoubleIcon
                sx={{ color: "white", transform: "rotate(90deg)" }}
              />
            </ListItemIcon>
          </ListItemButton>
        </ListItem>
      </Box>
    </div>
  );
  return (
    <Box component="nav" aria-label="mailbox folders">
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            position: "static",
            height: "100vh",
            paddingRight: "30px",
            background: "#37146b",
            transition: theme.transitions.create("width", {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
            width: isExpanded ? 240 : 90,
          },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  );
};

export default AppDrawer;
