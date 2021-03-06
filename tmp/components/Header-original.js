import React, { useState, useEffect, useContext } from "react";
import { AppBar, Button, Drawer, IconButton, Link, Menu, MenuItem, Toolbar } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import MenuIcon from "@material-ui/icons/Menu";
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

const useStyles = makeStyles((theme) => ({
  root: {
    //flexGrow: 1,
  },
  offset: theme.mixins.toolbar,
  header: {
    //backgroundColor: "#400CCC",
    backgroundColor: theme.palette.headerBackground.light,
    color: theme.palette.headerForeground.dark,
    paddingRight: "1em", //"79px",
    paddingLeft: "1em", //"118px",
    "@media  screen and (max-width: 900px)": {
      paddingLeft: 0,
    },
  },
  menuButton: {
    // fontFamily: "Open Sans, sans-serif",
    // fontWeight: 700,
    // size: "18px",
    // marginLeft: "38px",
    paddingLeft: "2em",
    paddingRight: "2em",
    marginLeft: "1em",
    marginRight: "1em",
    backgroundColor: theme.palette.headerBackground.dark,
    textTransform: 'none',
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
  },
  drawerContainer: {
    padding: "1em 1em",
  },
  drawerMenuItem: {
    borderBottom: "1px solid #ddd",
  }
}));

export default function Header() {
  const classes = useStyles();

  const { auth } = useContext(AuthContext);

  const [state, setState] = useState({
    mobileView: false,
    drawerOpen: false,
  });

  const { mobileView, drawerOpen } = state; // TODO: try commenting this and use state.mobileView 

  let headersData = [
    {
      label: "Home",
      icon: <HomeIcon />,
      href: "/",
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
  headersData = headersData.concat(
    auth.isAuthenticated ? [
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
  );

  useEffect(() => {
    const setResponsiveness = () => {
      return window.innerWidth < config.mobileDesktopWatershed
        ? setState((prevState) => ({ ...prevState, mobileView: true }))
        : setState((prevState) => ({ ...prevState, mobileView: false }));
    };
    setResponsiveness();
    window.addEventListener("resize", () => setResponsiveness());
    return () => {
      window.removeEventListener("resize", () => setResponsiveness());
    };
  }, []);

  const displayDesktop = () => {
    return (
      <Toolbar className={classes.toolbar}>
        <RouterLink to="/">
          <IconCustom name="LogoMain" size={40} />
        </RouterLink>
        <div>{getMenuButtons()}</div>
      </Toolbar>
    );
  };

  const displayMobile = () => {
    const handleDrawerOpen = () =>
      setState((prevState) => ({ ...prevState, drawerOpen: true }));
    const handleDrawerClose = () =>
      setState((prevState) => ({ ...prevState, drawerOpen: false }));

    return (
      <Toolbar>
        <IconButton
          {...{
            edge: "start",
            color: "inherit",
            "aria-label": "menu",
            "aria-haspopup": "true",
            onClick: handleDrawerOpen,
          }}
        >
          <MenuIcon />
        </IconButton>

        <Drawer
          {...{
            anchor: "left",
            open: drawerOpen,
            onClose: handleDrawerClose,
            onClick: handleDrawerClose, // to close on click everywhere
          }}
        >
          <div className={classes.drawerContainer}>{getDrawerChoices()}</div>
        </Drawer>

        <RouterLink to="/">
          <IconCustom name="LogoMain" size={32} />
        </RouterLink>

      </Toolbar>
    );
  };

  const getDrawerChoices = () => {
    return headersData.map(({ label, icon, href }) => {
      return (
        <Link
          {...{
            component: RouterLink,
            to: href,
            color: "inherit",
            style: { textDecoration: "none" },
            key: label,
          }}
        >
          <MenuItem className={classes.drawerMenuItem}>
            {icon} &nbsp; {label}
          </MenuItem>
        </Link>
      );
    });
  };

  // const LogoMain = (props) => {
  //   const size = props.size ? props.size : 32;
  //   return (
  //     <img src={ImageLogoMain} alt="Logo" width={size} height={size} />
  //   );
  // };

//  <IconCustom icon={ICONS.LOGO_MAIN} size="32" />
  // <div className={logoContainer}>
    //   <img src={mainLogo} style={nbStyle.logo} alt="Main logo"/>
    // </div>

  const getMenuButtons = () => {
    let h = headersData.map(({ label, href }) => {
      return (
        <Button
          {...{
            key: label,
            color: "inherit",
            to: href,
            component: RouterLink,
            className: classes.menuButton,
          }}
        >
          {label}
        </Button>
      );
    });
    if (auth.isAuthenticated) {
      h = (
        <>
          {h}
          <>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              //onClick={handleMenu}
              color="inherit"
            >
              <AccountCircleIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              //anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              //open={open}
              //onClose={handleClose}
            >
              <MenuItem /*onClick={handleClose}*/>Profile</MenuItem>
            </Menu>
          </>
        </>
      );
    }
    return h;
  };

  // <div className={classes.root}>
  return (
    <header>
      <AppBar className={classes.header} elevation={5} position="fixed">
        {mobileView ? displayMobile() : displayDesktop()}
      </AppBar>
      <div className={classes.offset} />
    </header>
);
}