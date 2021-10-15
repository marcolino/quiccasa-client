import { useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/styles";
import { StatusContext } from "../providers/StatusProvider";
import { AuthContext } from "../providers/AuthProvider";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles(theme => ({
	home: {
    fontSize: "1.5em",
	},
}));

export default function Home() {
	const classes = useStyles();
  const { auth } = useContext(AuthContext);
  const { setStatus } = useContext(StatusContext);
  const { t } = useTranslation();

  // TODO: here we simulate a notification arrival... Move to PushNotifications.onMessageListener ...
  useEffect(() => {
    setTimeout(() => {
      console.log("GO!");
      setStatus({notificationsCount: 12});
    }, 2000)
  }, [setStatus]);

  return (
    <div className={classes.home}>
      {(typeof auth.isAuthenticated !== "undefined") && // if auth.isAuthenticated is undefined, we don't know yet about user authentication...
        `${t("Home")} ${t("for")} ${auth.isAuthenticated ? t("authenticated user") : t("guest user")} ${auth.isAuthenticated ? auth.user.attributes.email : ""}`
      }
    </div>
  );
}
