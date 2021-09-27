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
  const [tokenFound, setTokenFound] = useState(false);

console.log("home");
  getToken(setTokenFound);

  onMessageListener().then(message => {
    console.info("MESSAGE:", message);
    setMessage(message);
    setShowNotification(true);
  }).catch(err => console.log('failed: ', err));
  
  useEffect(() => {
    if (showNotification) {
      if (message) {
        toastNotification.info(`T: ${message.notification.title}, B: ${message.notification.body}, P: B: ${message.priority}, tag: ${message.notification.tag}`);
      } else {
        toastNotification.info("There are some updates that you'll love!");
      }
      setShowNotification(false);
      setMessage(null);
    }
  }, [showNotification, message]);

  return (
    <div className={classes.home}>
      {(typeof auth.isAuthenticated !== "undefined") && // if auth.isAuthenticated is undefined, we don't know yet about user authentication...
        `${t("Home")} ${t("for")} ${auth.isAuthenticated ? t("authenticated user") : t("guest user")} ${auth.isAuthenticated ? auth.user.attributes.email : ""}`
      }
      <br />
      {tokenFound && <p> Notification permission enabled 👍🏻 </p>}
      {!tokenFound && <p> Need notification permission 🙏 </p>}
      <button onClick={() => setShowNotification(true)}>Show Toast</button>

   </div>
  );
}

