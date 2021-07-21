import React, { useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Drawer from '@material-ui/core/Drawer';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import ListAltIcon from "@material-ui/icons/ListAlt";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import { Link as RouterLink } from "react-router-dom";
import IconCustom from "./IconCustom";
import { AuthContext } from "../providers/AuthProvider";
import config from "../config.json";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  offset: theme.mixins.toolbar,
  header: {
    backgroundColor: theme.palette.headerBackground,
    color: theme.palette.headerForeground.dark,
    paddingRight: theme.spacing(1),
    paddingLeft: theme.spacing(1),
    "@media (max-width: 900px)": {
      paddingLeft: 0,
      paddingRight: 0,
    },
  },
  logo: {
    marginRight: theme.spacing(2),
  },
  menuLink: {
    marginRight: theme.spacing(2), // TODO: do we need this on link ??
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
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
  menuItem: {
    borderBottom: "1px solid #cfcfcf",
  },
  menuPaddingMobile: {
    padding: 0,
  },
}));

export default function MenuAppBar() {
  const classes = useStyles();
  const { auth } = useContext(AuthContext);

  // handle responsiveness
  useEffect(() => {
    const setResponsiveness = () => {
      return window.innerWidth < 900
        ? setState((prevState) => ({ ...prevState, mobileView: true }))
        : setState((prevState) => ({ ...prevState, mobileView: false }));
    };
    setResponsiveness();
    window.addEventListener("resize", () => setResponsiveness());
    return () => {
      window.removeEventListener("resize", () => setResponsiveness());
    };
  }, []);

  const [state, setState] = useState({
    mobileView: false,
    drawerOpen: false,
    userMenuIsOpen: false,
  });

  const {
    mobileView,
    drawerOpen,
    //userMenuIsOpen
  } = state; // TODO: try commenting this and use state.mobileView, ...

  const handleDrawerOpen = () =>
    setState((prevState) => ({ ...prevState, drawerOpen: true }));
  const handleDrawerClose = () =>
    setState((prevState) => ({ ...prevState, drawerOpen: false }));

// const handleUserMenuOpen = () =>
//   setState((prevState) => ({ ...prevState, userMenuOpen: true }));
// const handleUserMenuClose = () =>
//   setState((prevState) => ({ ...prevState, userMenuOpen: false }));

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
      label: "Home", // TODO: remove fropm here, and add to "main brand logo icon" and "main brand logo text"
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
        icon: <AccountCircleIcon />,
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

  // const displayDesktop = () => {
  //   return displayMobile(); // TODO
  // };

  const displayMobile = () => {
  
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
              {icon} &nbsp; {label}
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
        // <Link {...{
        //   key: label,
        //   component: RouterLink,
        //   to: href,
        //   color: "inherit",
        //   className: classes.menuLink,
        // }}>
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
              {icon} &nbsp; {label} {/* TODO: vertically align icon and label */}
            </Link>
          </MenuItem>
        // </Link>
      ));
    };

    return (
      <header>
        <AppBar className={classes.header} elevation={5} position="fixed">
          <Toolbar>

            {/* drawer button */}
            {mobileView &&
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
            {mobileView &&
              <Drawer // mobile only
                anchor="left"
                open={drawerOpen}
                onClose={handleDrawerClose}
                onClick={handleDrawerClose} // to close on click everywhere
              >
                <div className={classes.drawerContainer}>{getMobileMainMenuItems()}</div>
              </Drawer>
            }

            {/* main brand logo icon */}
            <RouterLink to="/">
              <IconCustom name="LogoMain" size={32} className={classes.logo}/>
            </RouterLink>

            {/* main brand logo text */}
            <Typography variant="h6" className={classes.title}>
              {config.appTitle}
            </Typography>

            {!mobileView && // TODO: mobileView true/false => responsiveMode mobile/desktop
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
                <AccountCircle /> {/* TODO: change aspect (color?) if auth... */}
              </IconButton>

              <Menu
                id="menu-appbar"
                anchorEl={anchorUserMenuEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={userMenuIsOpen}
                onClose={handleUserMenuClose}
                onClick={handleUserMenuClose} // to close on click everywhere
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                MenuListProps={{
                  classes: mobileView ? { padding: classes.menuPaddingMobile } : {}
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
  };

  return displayMobile(); // TODO: return directly, without displayMobile...

  // return (
  //   <header>
  //     <AppBar className={classes.header} elevation={5} position="fixed">
  //       {mobileView ? displayMobile() : displayDesktop()}
  //     </AppBar>
  //     <div className={classes.offset} />
  //   </header>
  // );
}
