import React, { useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/styles";
import Amplify, { I18n } from "aws-amplify";
import { currentAuthenticatedUser } from "./AuthPromise";
import { AuthContext } from "../providers/AuthProvider";
import Routes from "./Routes";
import config from "../config.json";

const useStyles = makeStyles(theme => ({
  body: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "left",
    padding: theme.spacing(2),
  },
}));

export default function Body() {
	const classes = useStyles();
  const { setAuth } = useContext(AuthContext);

  useEffect(() => {

    const isLocalhost = Boolean(
      window.location.hostname === "localhost" ||
      // [::1] is the IPv6 localhost address.
      window.location.hostname === "[::1]" ||
      // 127.0.0.1/8 is considered localhost for IPv4.
      window.location.hostname.match(
        /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
      )
    );
  
    // set isAuthenticated to undefined because we don't know yet, and so that we can later detect this suspense state
    setAuth({isAuthenticated: undefined, user: null});

    // const oauth = {
    //   domain: "sistemisolari.auth.eu-west-1.amazoncognito.com",
    //   scope: ["phone", "email", "profile", "openid", "aws.cognito.signin.user.admin"],
    //   responseType: "code", // "code" or "token"; note that REFRESH token will only be generated when the responseType is "code"
    // };

    window.LOG_LEVEL = (process.env.NODE_ENV !== "production" && config.debugAwsAmplify ? "DEBUG" : "");

    Amplify.configure({
      Auth: {
        //oauth: {...oauth,
        oauth: {...config.oauth,
          redirectSignIn: isLocalhost ? "http://localhost:3000/" : "https://sistemisolari.auth.eu-west-1.amazoncognito.com/",
          redirectSignOut: isLocalhost ? "http://localhost:3000/" : "https://sistemisolari.auth.eu-west-1.amazoncognito.com/",
        },
        region: process.env.REACT_APP_REGION,
        userPoolId: process.env.REACT_APP_USER_POOL_ID,
        userPoolWebClientId: process.env.REACT_APP_USER_POOL_WEB_CLIENT_ID,
        storage: localStorage,
      },
    });

    I18n.setLanguage("it"); // TODO: this should enable amplify localized error messages, but it's not yet implemented (try using it before configure()...)
    
    currentAuthenticatedUser({
      success: (user) => {
        console.info("current authenticated user is", user);
        setAuth({isAuthenticated: true, user});
      },
      error: (err) => {
        console.info("no current authenticated user");
        setAuth({isAuthenticated: false, user: null});
      }
    });
  }, [setAuth]);

  return (
    <div className={classes.body}>
      {Routes}
    </div>
  );
}
