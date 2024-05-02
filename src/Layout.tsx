import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import CssBaseline from "@mui/material/CssBaseline";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import GridViewIcon from "@mui/icons-material/GridView";
import LinkIcon from "@mui/icons-material/Link";
import MoneyOffIcon from "@mui/icons-material/MoneyOff";
import ShieldOutlinedIcon from "@mui/icons-material/ShieldOutlined";
import React from "react";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import UnfoldLessDoubleIcon from "@mui/icons-material/UnfoldLessDouble";
import LensOutlinedIcon from "@mui/icons-material/LensOutlined";

const drawerWidth = 240;

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

const Layout: React.FC = () => {
  const drawer = (
    <div>
      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <LensOutlinedIcon sx={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText primary="Kapstan" sx={{ color: "white" }} />
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
                <ListItemText
                  color="white"
                  primary={item.title}
                  sx={{ color: "white" }}
                />
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
              <ListItemText primary="Admin" sx={{ color: "white" }} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <BookmarkBorderIcon sx={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText primary="Docs" sx={{ color: "white" }} />
            </ListItemButton>
          </ListItem>
        </List>
        <Divider sx={{ background: "#4d1b95" }} />
        <ListItem disablePadding>
          <ListItemButton sx={{ justifyContent: "flex-end" }}>
            <ListItemIcon>
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
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            // onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Responsive drawer
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        // sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              // width: drawerWidth,
              paddingRight: "30px",
              background: "#37146b",
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        {/* children */}

        <Toolbar />
        <Typography paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Rhoncus
          dolor purus non enim praesent elementum facilisis leo vel. Risus at
          ultrices mi tempus imperdiet. Semper risus in hendrerit gravida rutrum
          quisque non tellus. Convallis convallis tellus id interdum velit
          laoreet id donec ultrices. Odio morbi quis commodo odio aenean sed
          adipiscing. Amet nisl suscipit adipiscing bibendum est ultricies
          integer quis. Cursus euismod quis viverra nibh cras. Metus vulputate
          eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo
          quis imperdiet massa tincidunt. Cras tincidunt lobortis feugiat
          vivamus at augue. At augue eget arcu dictum varius duis at consectetur
          lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa sapien
          faucibus et molestie ac.
        </Typography>
        <Typography paragraph>
          Consequat mauris nunc congue nisi vitae suscipit. Fringilla est
          ullamcorper eget nulla facilisi etiam dignissim diam. Pulvinar
          elementum integer enim neque volutpat ac tincidunt. Ornare suspendisse
          sed nisi lacus sed viverra tellus. Purus sit amet volutpat consequat
          mauris. Elementum eu facilisis sed odio morbi. Euismod lacinia at quis
          risus sed vulputate odio. Morbi tincidunt ornare massa eget egestas
          purus viverra accumsan in. In hendrerit gravida rutrum quisque non
          tellus orci ac. Pellentesque nec nam aliquam sem et tortor. Habitant
          morbi tristique senectus et. Adipiscing elit duis tristique
          sollicitudin nibh sit. Ornare aenean euismod elementum nisi quis
          eleifend. Commodo viverra maecenas accumsan lacus vel facilisis. Nulla
          posuere sollicitudin aliquam ultrices sagittis orci a.
        </Typography>
      </Box>
    </Box>
  );
};

export default Layout;
