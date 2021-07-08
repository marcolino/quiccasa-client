import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from '@material-ui/core/CssBaseline';
import { AuthProvider } from "../providers/AuthProvider";
import { StatusProvider } from "../providers/StatusProvider";
import Header from "./Header";
import Body from "./Body";
import Footer from "./Footer";
import theme from "../theme";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <StatusProvider>
          <CssBaseline />
          <BrowserRouter>
            <Page />
          </BrowserRouter>
        </StatusProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

const footerHeight = '1.5rem';
const useStyles = makeStyles(theme => ({
  pageContainer: {
    position: 'relative',
    minHeight: '100vh',
  },
  contentWrap: {
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
    padding: theme.spacing(2),
  },
  footer: {
    position: 'absolute',
    bottom: '0.5rem',
    width: '100%',
    height: footerHeight,
  },
}));

const Page = () => {
	const classes = useStyles();

  return (
    <div className={classes.pageContainer}>
      <div className={classes.contentWrap}>
        <Header className={classes.header} />
        <Body className={classes.body} />
      </div>
      <div className={classes.footer}>
        <Footer /> {/* we don't want any footer for Auth screens, so render inside any component */}
      </div>
    </div>
  );
}