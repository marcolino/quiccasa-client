import React from "react";
import { makeStyles } from "@material-ui/styles";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from '@material-ui/core/CssBaseline';
import { AuthProvider } from "../providers/AuthProvider";
import { StatusProvider } from "../providers/StatusProvider";
import Header from "./Header";
import Body from "./Body";
import Footer from "./Footer";
import Spinner from "./Spinner";
import theme from "../theme";

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

// TODO: use isAuthLocation, and not in Footer, to avoid showing footer at all if not wanted

const footerHeight = '1.5rem';
const useStyles = makeStyles(theme => ({
  contentsContainer: {
    position: 'relative',
    minHeight: '100vh',
  },
  contentsWrap: {
    paddingBottom: footerHeight,
  },
  header: {
    flexGrow: 1,
  },
  body: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'left',
    //padding: theme.spacing(2),
  },
  footer: {
    position: 'absolute',
    bottom: '0.5rem',
    width: '100%',
    height: footerHeight,
  },
}));

const Contents = () => {
	const classes = useStyles();

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