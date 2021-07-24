import React from "react";
import { makeStyles } from "@material-ui/styles";
import { BrowserRouter, useLocation } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { AuthProvider } from "../providers/AuthProvider";
import { StatusProvider } from "../providers/StatusProvider";
import Header from "./Header";
import Body from "./Body";
import Footer from "./Footer";
import Spinner from "./Spinner";
import { isAuthLocation } from "../libs/Misc";
import config from "../config";
import theme from "../themes/default"; // here we choose the theme

export default function App() {

  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <StatusProvider>
          <CssBaseline />
          <BrowserRouter>
            <Contents />
            <Spinner />
          </BrowserRouter>
        </StatusProvider>
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
	const classes = useStyles({footerHeight: isAuthLocation(location) ? 0 : config.footerHeight }); // hide footer while in auth screens

  return (
    <div className={classes.contentsContainer}>
      <div className={classes.contentsWrap}>
        <Header className={classes.header} />
        <Body className={classes.body} />
      </div>
      <div className={classes.footer}>
        <Footer />
      </div>
    </div>
  );
}