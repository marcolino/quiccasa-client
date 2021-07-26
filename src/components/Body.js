import React, { useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/styles";
import Amplify, { I18n } from "aws-amplify";
import { currentAuthenticatedUser } from "./AuthPromise";
import { AuthContext } from "../providers/AuthProvider";
import Routes from "./Routes";

window.LOG_LEVEL = 'DEBUG'; 

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
  
    // const oauth = {
    //   domain: "sistemisolari.auth.eu-west-1.amazoncognito.com",
    //   scope: ["phone", "email", "profile", "openid"/*, "aws.cognito.signin.user.admin"*/],
    //   responseType: "code", // or "token", note that REFRESH token will only be generated when the responseType is code
    // };


/*
Error 400: redirect_uri_mismatch
The redirect URI in the request, https://sistemisolari.auth.eu-west-1.amazoncognito.com/oauth2/idpresponse, does not match the ones authorized for the OAuth client. To update the authorized redirect URIs, visit: https://console.developers.google.com/apis/credentials/oauthclient/748892040096-s5a1v8vldot626utfleckr08r51qtigp.apps.googleusercontent.com?project=748892040096
*/

console.log("isLocalhost:", isLocalhost);
    Amplify.configure({
      Auth: {
        oauth: {
          
          //...oauth,

          domain: "sistemisolari.auth.eu-west-1.amazoncognito.com",
          scope: ["phone", "email", "profile", "openid"/*, "aws.cognito.signin.user.admin"*/],
          responseType: "token", //"code", // or "token", note that REFRESH token will only be generated when the responseType is code

          //redirectSignIn: isLocalhost ? "http://localhost:3000/" : "https://quiccasa.sistemisolari.com/",
          redirectSignIn: isLocalhost ? "http://localhost:3000/oauth2" : "https://sistemisolari.auth.eu-west-1.amazoncognito.com/oauth2/authorize",
          //https://sistemisolari.auth.eu-west-1.amazoncognito.com/oauth2/authorize?redirect_uri=http%3A%2F%2Flocalhost%3A3000%2F&response_type=code&client_id=67c2r6sh1fo6c85u819m9pir91&identity_provider=facebook&scope=phone%20email%20profile%20openid&state=GcPFRP5T6K9GjrYXIfpBEq4fPEjg1wu9&code_challenge=XB2RTxVNEFc5S9SyEwFiUerhSKcJkTOEMJkjHDfK0rA&code_challenge_method=S256         
          redirectSignOut: isLocalhost ? "http://localhost:3000/" : "https://quiccasa.sistemisolari.com/",
        },
        region: process.env.REACT_APP_REGION,
        userPoolId: process.env.REACT_APP_USER_POOL_ID,
        userPoolWebClientId: process.env.REACT_APP_USER_POOL_WEB_CLIENT_ID,
        storage: localStorage,
      },
    });

    I18n.setLanguage("it"); // TODO: this should enable amplify localized error messages, but it's not yet implemented (try using it before configure()...)
    
    // Auth.currentAuthenticatedUser()
    // .then(user => {
    //   console.log("currentAuthenticatedUser:", user);
    //   setAuth({isAuthenticated: true, user});
    // })
    // .catch(err => console.log(err));
  
    currentAuthenticatedUser({
      success: (user) => {
        console.log("currentAuthenticatedUser:", user);
        setAuth({isAuthenticated: true, user});
      },
      error: (err) => {
        //console.info(err);
      }
    });
  }, [setAuth]);

  return (
    <div className={classes.body}>
      {Routes}
    </div>
  );
}
