import * as React from "react";
import { useEffect, useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import { Avatar } from "@mui/material";
import { useRouter } from "next/router";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import DateRangeIcon from "@mui/icons-material/DateRange";
import LocalMoviesIcon from "@mui/icons-material/LocalMovies";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import BookOnlineIcon from "@mui/icons-material/BookOnline";
import LogoutIcon from "@mui/icons-material/Logout";
import SchoolIcon from "@mui/icons-material/School";
import EventSeatIcon from "@mui/icons-material/EventSeat";
import Card from "@mui/material/Card";
import axios from "axios";
import LinearProgress from "@mui/material/LinearProgress";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const tabs = [
  {
    name: "Home",
    icon: <HomeIcon />,
    path: "/views/admin/Home",
  },
  {
    name: "Admin",
    icon: <AdminPanelSettingsIcon />,
    path: "/views/admin/Admin",
  },
  {
    name: "Movie",
    icon: <LocalMoviesIcon />,
    path: "/views/admin/Movie",
  },
  {
    name: "Ticket",
    icon: <BookOnlineIcon />,
    path: "/views/admin/Ticket",
  },
  {
    name: "Seat",
    icon: <EventSeatIcon />,
    path: "/views/admin/Seat",
  },
];
const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));
export default function AdminNav(props) {
  const router = useRouter();
  const { children, loading } = props;
  const { title } = router.query;
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const [profilePicture, setProfilePicture] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    axios
      .get("/api/admin/admin")
      .then((res) => {
        const data = res.data.value[0];
        console.log(data)
        if (res.data.success == true) {
          if (data.profile_picture != "") {
            setProfilePicture(data.profile_picture);
          } else setProfilePicture(data.firstname);
          setName(data.username);
        }
      })
      .catch((err) => {
      });
  }, []);
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const logout = () => {
    axios
      .delete("/api/auth/logout")
      .then((res) => {
        router.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            {title}
          </Typography>
        </Toolbar>
        {loading && <LinearProgress />}
      </AppBar>

      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <Card sx={{ maxWidth: 345 }}>
          <div className="flex flex-col items-center justify-center bg-white p-4 shadow rounded-lg">
            <div className="inline-flex shadow-lg border border-gray-200 rounded-full overflow-hidden h-40 w-40">
              <Avatar
                alt="admin profile picture"
                src={profilePicture}
                align="center"
                sx={{ width: "100%", height: "100%" }}
              />
            </div>

            <h2 className="mt-4 font-bold text-xl">{name}</h2>
            <h6 className="mt-2 text-sm font-medium">Admin</h6>

            <p className="text-xs text-gray-500 text-center mt-3">
              Movie Handler
            </p>
          </div>
        </Card>
        <List>
          {tabs.map((val, index) => (
            <ListItem
              button
              key={index}
              onClick={() =>
                router.push({
                  pathname: val.path,
                  query: { title: val.name },
                })
              }
            >
              <ListItemIcon>{val.icon}</ListItemIcon>
              <ListItemText primary={val.name} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          <ListItem
            button
            onClick={() =>
              router.push("/views/admin/Profile?title=Admin+Profile")
            }
          >
            <ListItemIcon>
              <AccountCircleIcon />
            </ListItemIcon>
            <ListItemText primary={"Profile"} />
          </ListItem>

          <ListItem button onClick={logout}>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary={"Logout"} />
          </ListItem>
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        {children}
      </Main>
    </Box>
  );
}
