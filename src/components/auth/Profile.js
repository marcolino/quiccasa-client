import React from "react";
import { useContext } from "react";
import { makeStyles } from "@material-ui/styles";
import { AuthContext } from "../../providers/AuthProvider";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles(theme => ({
	profile: {
    fontSize: "1.5em",
	},
}));

function Profile() {
	const classes = useStyles();
  const { auth } = useContext(AuthContext);
  const { t } = useTranslation();

  return (
    <div className={classes.profile}>
      {(typeof auth.user !== "undefined") && // if auth.user is undefined, we don't know yet about user authentication...
        `${t("Profile")} ${t("for")} ${auth.user ? t("authenticated user") : t("guest user")} ${auth.user ? auth.user.email : ""}`
      }
   </div>
  );
}

export default React.memo(Profile);