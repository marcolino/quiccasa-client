import { useEffect, useContext } from "react";
import Amplify, { I18n } from "aws-amplify";
import { currentAuthenticatedUser } from "../libs/TrackPromise";
import { AuthContext } from "../providers/AuthProvider";
import { isLocalhost } from "../libs/Misc";
import config from "../config";



export default function Authentication() {
  const { setAuth } = useContext(AuthContext);

  useEffect(() => {

    /**
     * isAuthenticated:
     *  - undefined: we don't know yet, we nned this state in suspense
     *  - false: guest user
     *  - true: authenticated user
     */
    setAuth({isAuthenticated: undefined, user: null});

    window.LOG_LEVEL = (process.env.NODE_ENV !== "production" && config.debugAwsAmplify ? "DEBUG" : "");

    Amplify.configure({
      Auth: {
        oauth: {...config.oauth,
          redirectSignIn: isLocalhost ? "http://localhost:3000/" : "https://quiccasa.sistemisolari.com/",
          redirectSignOut: isLocalhost ? "http://localhost:3000/" : "https://quiccasa.sistemisolari.com/",
        },
        region: process.env.REACT_APP_REGION,
        userPoolId: process.env.REACT_APP_USER_POOL_ID,
        userPoolWebClientId: process.env.REACT_APP_USER_POOL_WEB_CLIENT_ID,
        storage: localStorage,
      },
    });

    /**
    * TODO: I18n.setLanguage should enable amplify localized error messages,
    * but it's not implemented: we should manually translate error messages our side...
    */
    I18n.setLanguage("it");
    
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

  return null;
}
