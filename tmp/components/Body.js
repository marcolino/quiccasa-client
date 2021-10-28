import { useEffect, useContext } from "react";
import Amplify, { I18n } from "aws-amplify";
import { currentAuthenticatedUser } from "../libs/TrackPromise";
import { AuthContext } from "../providers/AuthProvider";
import { isLocalhost } from "../libs/Misc";
import config from "../config.json";



export default function Body() {
	//const classes = useStyles();
  const { setAuth } = useContext(AuthContext);

  useEffect(() => {

    // set isAuthenticated to undefined because we don't know yet, and so that we can later detect this suspense state
    setAuth({isAuthenticated: undefined, user: null});

    window.LOG_LEVEL = (process.env.NODE_ENV !== "production" && config.debugAwsAmplify ? "DEBUG" : "");

    Amplify.configure({
      Auth: {
        oauth: {...config.oauth,
          redirectSignIn: isLocalhost ? "http://localhost:3000/" : "https://quiccasa.sistemisolari.com/", // "https://sistemisolari.auth.eu-west-1.amazoncognito.com/",
          redirectSignOut: isLocalhost ? "http://localhost:3000/" : "https://quiccasa.sistemisolari.com/", //"https://sistemisolari.auth.eu-west-1.amazoncognito.com/",
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
}
