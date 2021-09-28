import { useState, useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import { AuthContext } from "../providers/AuthProvider";
import { useTranslation } from "react-i18next";

import { toastNotification } from "./ToastNotification";
import { getToken, onMessageListener } from "../libs/Firebase";

const useStyles = makeStyles(theme => ({
	home: {
    fontSize: "1.5em",
	},
}));

export default function Home() {
	const classes = useStyles();
  const { auth } = useContext(AuthContext);
  const { t } = useTranslation();

  const [message, setMessage] = useState(null);
  const [showNotification, setShowNotification] = useState(false);
  const [askForNotificationsPermission, setAskForNotificationsPermission] = useState(false);
  const [tokenFound, setTokenFound] = useState(false);

  /**
   * TODO:
   *  - move this stuff to a component to be shown in profile
   *  - better handle status of request, from token: allowed / denied / to be asked
   *  - use a better layout to show status of request (preparing for more variables, in the future (geolocalization, ...)
   */
  
  getToken(setTokenFound);

  onMessageListener().then(message => {
    console.info("got push message:", message);
    setMessage(message);
    setShowNotification(true);
  }).catch(err => {
    console.error('error listening to push messages:', err);
  });
  
  useEffect(() => {
    if (showNotification) {
      if (message) { // TODO: design a better graphical output...
        toastNotification.info(`T: ${message.notification.title}, B: ${message.notification.body}, P: B: ${message.priority}, tag: ${message.notification.tag}`);
      } else {
        toastNotification.info("empty new message...");
      }
      setShowNotification(false);
      setMessage(null);
    }
  }, [showNotification, message]);

  useEffect(() => {
    if (askForNotificationsPermission) {
      toastNotification.info("Forcing system notification persmission request...");
      setAskForNotificationsPermission(false);
    }
  }, [askForNotificationsPermission]);

  return (
    <div className={classes.home}>
      {(typeof auth.isAuthenticated !== "undefined") && // if auth.isAuthenticated is undefined, we don't know yet about user authentication...
        `${t("Home")} ${t("for")} ${auth.isAuthenticated ? t("authenticated user") : t("guest user")} ${auth.isAuthenticated ? auth.user.attributes.email : ""}`
      }
      <br />
      {tokenFound && (
        <p> Notification permission enabled 👍🏻 </p>
      )}
      {!tokenFound && (
        <>
          <p> Notification permission not enabled 🙏 </p>
          <button onClick={() => setAskForNotificationsPermission(true)}>Allow Push Notifications</button>
        </>
      )}

   </div>
  );
}
