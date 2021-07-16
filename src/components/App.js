import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from '@material-ui/core/CssBaseline';
import { AuthProvider } from "../providers/AuthProvider";
import { StatusProvider, StatusContext } from "../providers/StatusProvider";
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
    padding: theme.spacing(2),
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
  const { status } = useContext(StatusContext);

  return (
    <div className={classes.contentsContainer}>
      <div className={classes.contentsWrap}>
        <Header className={classes.header} />
        <Body className={classes.body} />
      </div>
      {status.showFooter && /* we don't want any footer for Auth screens, so render it conditionally */
        <div className={classes.footer}>
          <Footer />
        </div>
      }
    </div>
  );
}