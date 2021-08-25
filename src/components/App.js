import React, { useContext } from "react";
import { makeStyles } from "@material-ui/styles";
import { BrowserRouter, useLocation } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { AuthProvider } from "../providers/AuthProvider";
import { StatusProvider } from "../providers/StatusProvider";
import { OnlineStatusProvider, OnlineStatusContext } from "../providers/OnlineStatusProvider";
import Header from "./Header";
import Authentication from "./Authentication";
import Routes from "./Routes";
import Footer from "./Footer";
import Spinner from "./Spinner";
import CookieBanner from "./CookieBanner";
import { isAuthLocation } from "../libs/Misc";
import config from "../config";
import theme from "../themes/default"; // here we choose the theme

export default function App() {

  console.log("App rendering");
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <OnlineStatusProvider>
          <StatusProvider>
            <CssBaseline />
            <BrowserRouter>
              <Authentication />
              <Contents />
              <Spinner />
            </BrowserRouter>
          </StatusProvider>
        </OnlineStatusProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

const useStyles = makeStyles(theme => ({
  contentsContainer: {
    position: "relative",
    minHeight: "100vh",
  },
  contentsWrap: props => ({
    paddingBottom: props.footerHeight,
  }),
  header: {
  },
  body: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "left",
    padding: theme.spacing(2),
  },
  footer: props => ({
    position: "absolute",
    bottom: "0.5rem",
    width: "100%",
    height: props.footerHeight,
  }),
}));

const Contents = () => {
  const location = useLocation();
  const isOnline = useContext(OnlineStatusContext);
	const classes = useStyles({footerHeight: isAuthLocation(location) ? 0 : config.footerHeight }); // hide footer while in auth screens

  return (
    <div className={classes.contentsContainer}>
      <div className={classes.contentsWrap}>
        <div className={classes.header}>
          <Header />
        </div>
        <div className={classes.body}>
          <Routes />
        </div>
        <CookieBanner />
      </div>
      <div className={classes.footer}>
        <Footer isOnline={isOnline} />
      </div>
    </div>
  );
}