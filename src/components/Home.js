import React from "react";
import { useContext } from "react";
import { makeStyles } from "@material-ui/styles";
import { AuthContext } from "../providers/AuthProvider";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles(theme => ({
	home: {
    fontSize: "1.5em",
	},
}));

function Home() {
	const classes = useStyles();
  const { auth } = useContext(AuthContext);
  const { t } = useTranslation();

  return (
    <div className={classes.home}>
      {(typeof auth.isAuthenticated !== "undefined") && // if auth.isAuthenticated is undefined, we don't know yet about user authentication...
        `${t("Home")} ${t("for")} ${auth.isAuthenticated ? t("authenticated user") : t("guest user")} ${auth.isAuthenticated ? auth.user.attributes.email : ""}`
      }
    </div>
  );
}

export default React.memo(Home);