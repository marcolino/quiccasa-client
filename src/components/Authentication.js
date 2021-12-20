import React from "react";
import { useEffect, useContext } from "react";
//import Amplify/*, { I18n }*/ from "aws-amplify";
//import { useTranslation } from "react-i18next";
//import { currentAuthenticatedUser } from "../libs/TrackPromise";
import { AuthContext } from "../providers/AuthProvider";
//import { isLocalhost } from "../libs/Misc";
import "../i18n"; // TODO: can we remove this import from here? Now we have it in /src/index.js ...
import config from "../config";



function Authentication() {
console.log('Authentication');
  const { auth, setAuth } = useContext(AuthContext);
  //const { i18n } = useTranslation();

  useEffect(() => {
console.log('Authentication useEffect');

    /**
     * user:
     *  - undefined: we don't know yet, we need this state in suspense and in routes
     *  - null: guest user
     *  - true: authenticated user
     */
    //setAuth({ user: undefined });
    //setAuth({ user: false });

    window.LOG_LEVEL = (process.env.NODE_ENV !== "production" && config.debugAwsAmplify ? "DEBUG" : "");

    // Amplify.configure({
    //   Auth: {
    //     oauth: {...config.oauth,
    //       redirectSignIn: isLocalhost ? config.oauthRedirectSignInLocal : config.oauthRedirectSignInPublic,
    //       redirectSignOut: isLocalhost ? config.oauthRedirectSignOutLocal : config.oauthRedirectSignOutPublic,
    //     },
    //     region: process.env.REACT_APP_REGION,
    //     userPoolId: process.env.REACT_APP_USER_POOL_ID,
    //     userPoolWebClientId: process.env.REACT_APP_USER_POOL_WEB_CLIENT_ID,
    //     storage: localStorage,
    //   },
    // });
    //
    // /**
    // * TODO: I18n.setLanguage should enable amplify localized error messages,
    // * but it's not implemented: we shell manually translate error messages our side.
    // */
    // //I18n.setLanguage(i18n.currentLanguage);
    
    // currentAuthenticatedUser({
    //   success: (user) => {
    //     console.info("authenticated user is", user);
    //     setAuth({ user: user ? user : false });
    //   },
    //   error: (err) => {
    //     console.info("no authenticated user", err);
    //     setAuth({ user: null });
    //   }
    // });
    console.info("Authentication.js: authenticated user:", auth.user);

  }, [auth, setAuth/*, i18n.currentLanguage*/]);

  return null;
}

export default React.memo(Authentication);
