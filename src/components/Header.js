import React, { useState, useEffect, useContext } from "react";
import { makeStyles, AppBar, Button, Drawer, IconButton, Link, MenuItem, Toolbar } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
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
    "@media (max-width: 900px)": {
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
}));

export default function Header() {
  const classes = useStyles();

  const { auth } = useContext(AuthContext);

  const [state, setState] = useState({
    mobileView: false,
    drawerOpen: false,
  });

  const { mobileView, drawerOpen } = state;

  let headersData = [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Searches",
      href: "/searches",
    },
    {
      label: "Listings",
      href: "/listings",
    },
  ];
  headersData = headersData.concat(
    auth.isAuthenticated ? [
      {
        label: "Profile",
        href: "/profile",
      },
      {
        label: "Logout",
        href: "/signout",
      },
    ] : [
      {
        label: "Sign in",
        href: "/signin",
      },
      {
        label: "Sign up",
        href: "/signup",
      },
    ]
  );

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
    return headersData.map(({ label, href }) => {
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
          <MenuItem>{label}</MenuItem>
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
    return headersData.map(({ label, href }) => {
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