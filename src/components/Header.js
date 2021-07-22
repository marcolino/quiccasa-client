import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link as RouterLink } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Drawer from "@material-ui/core/Drawer";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MenuIcon from "@material-ui/icons/Menu";
import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import ListAltIcon from "@material-ui/icons/ListAlt";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn";
import IconCustom from "./IconCustom";
import IconGravatar from "./IconGravatar";
import { AuthContext } from "../providers/AuthProvider";
import config from "../config.json";

const useStyles = makeStyles((theme) => ({
  root: {
    //flexGrow: 1,
  },
  offset: theme.mixins.toolbar,
  header: {
    backgroundColor: theme.palette.headerBackground,
    color: theme.palette.headerForeground.dark,
    paddingRight: theme.spacing(1),
    paddingLeft: theme.spacing(1),
  },
  logo: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(2),
  },
  menuLink: {
    marginRight: theme.spacing(2),
    textDecoration: "none",
    "&:hover": {
      textDecoration: "none",
    },
  },
  title: {
    flexGrow: 1,
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
  },
  drawerContainer: {
  },
  menuItem: {
    borderBottom: "1px solid #e8e8e8",
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  menuPadding: {
    padding: 0,
  },
}));

export default function MenuAppBar() {
  const classes = useStyles();
  const { auth } = useContext(AuthContext);

  // handle responsiveness
  useEffect(() => {
    const setResponsiveness = () => {
      return window.innerWidth < config.mobileDesktopWatershed
        ? setState((prevState) => ({ ...prevState, view: "mobile" }))
        : setState((prevState) => ({ ...prevState, view: "desktop" }));
    };
    setResponsiveness();
    window.addEventListener("resize", () => setResponsiveness());
    return () => {
      window.removeEventListener("resize", () => setResponsiveness());
    };
  }, []);

  const [state, setState] = useState({
    view: "mobile", // mobile / desktop
    drawerOpen: false,
    userMenuIsOpen: false,
  });

  const handleDrawerOpen = () =>
    setState((prevState) => ({ ...prevState, drawerOpen: true }));
  const handleDrawerClose = () =>
    setState((prevState) => ({ ...prevState, drawerOpen: false }));

  const [anchorUserMenuEl, setAnchorUserMenuEl] = React.useState(null);
  const userMenuIsOpen = Boolean(anchorUserMenuEl);

  const handleUserMenuOpen = (event) => {
    setAnchorUserMenuEl(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setAnchorUserMenuEl(null);
  };
  
  const mainItems = [
    {
      label: "Home",
      icon: <HomeIcon />,
      href: "/",
      showInDesktopMode: false,
    },
    {
      label: "Searches",
      icon: <SearchIcon />,
      href: "/searches",
    },
    {
      label: "Listings",
      icon: <ListAltIcon />,
      href: "/listings",
    },
  ];

  const userItems = auth.isAuthenticated ?
    [
      {
        label: "Profile",
        icon: 
        <IconGravatar
          email={auth.user.attributes.email}
          size={30}
        />,
        href: "/profile",
      },
      {
        label: "Sign out",
        icon: <ExitToAppIcon />,
        href: "/signout",
      },
    ] : [
      {
        label: "Sign in",
        icon: <VpnKeyIcon />,
        href: "/signin",
      },
      {
        label: "Sign up",
        icon: <AssignmentTurnedInIcon />,
        href: "/signup",
      },
    ]
  ;
 
  const getMobileMainMenuItems = () => {
    return mainItems.map(({ label, icon, href }) => (
      <MenuItem
        key={label}
        className={classes.menuItem}
      >
        <Link {...{
          key: label,
          component: RouterLink,
          to: href,
          color: "inherit",
          className: classes.menuLink,
        }}>
          <Grid container spacing={1} alignItems="center">
            {icon}
            <span style={{ paddingLeft: 8, paddingTop: 3 }}>{label}</span>
          </Grid>
        </Link>
      </MenuItem>
    ));
  };

  const getDesktopMainHeaderItems = () => {
    return mainItems.filter(item => item.showInDesktopMode !== false).map(({ label, icon, href }) => (
      <Link {...{
        key: label,
        component: RouterLink,
        to: href,
        color: "inherit",
        className: classes.menuLink,
      }}>
        {label}
      </Link>
    ));
  };

  const getUserMenuItems = () => {
    return userItems.map(({ label, icon, href }) => (
        <MenuItem
          key={label}
          className={classes.menuItem}
        >
          <Link {...{
            key: label,
            component: RouterLink,
            to: href,
            color: "inherit",
            className: classes.menuLink,
          }}>
            <Grid container spacing={1} alignItems="center">
              {icon}
              <span style={{ paddingLeft: 8, paddingTop: 3 }}>{label}</span>
            </Grid>
          </Link>
        </MenuItem>
    ));
  };

  return (
    <header>
      <AppBar className={classes.header} elevation={5} position="fixed">
        <Toolbar variant="dense">

          {/* drawer button */}
          {state.view === "mobile" &&
            <IconButton {...{ // mobile only
              edge: "start",
              color: "inherit",
              "aria-label": "menu",
              "aria-haspopup": "true",
              onClick: handleDrawerOpen,
            }}>
              <MenuIcon />
            </IconButton>
          }

          {/* drawer menu */}
          {state.view === "mobile" &&
            <Drawer // mobile only
              anchor="left"
              open={state.drawerOpen}
              onClose={handleDrawerClose}
              onClick={handleDrawerClose} // to close on click everywhere
            >
              <div className={classes.drawerContainer}>{getMobileMainMenuItems()}</div>
            </Drawer>
          }

          {/* main brand logo icon */}
          <RouterLink to="/">
            <IconCustom name="LogoMain" size={30} className={classes.logo}/>
          </RouterLink>

          {/* main brand logo text */}
          <Typography variant="subtitle1" className={classes.title}>
            {config.appTitle}
          </Typography>

          {state.view === "desktop" &&
            <div>
              {getDesktopMainHeaderItems()}
            </div>
          }

          {/* user menu */}
          <>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleUserMenuOpen}
              color="inherit"
            >
              {auth.isAuthenticated ?
                <IconGravatar
                  email={auth.user.attributes.email}
                  size={30}
                /> :
                <AccountCircleIcon />
              }
            </IconButton>

            <Menu
              id="menu-appbar"
              anchorEl={anchorUserMenuEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={userMenuIsOpen}
              onClose={handleUserMenuClose}
              onClick={handleUserMenuClose} // to close on click everywhere
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              MenuListProps={{
                classes: { padding: classes.menuPadding }
              }}
            >
              {getUserMenuItems()}
            </Menu>
          </>
        </Toolbar>
      </AppBar>
      <div className={classes.offset} />
    </header>
  );
}
