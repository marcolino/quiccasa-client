import React from "react";
// import { useContext } from "react";
import { makeStyles } from "@material-ui/styles";
// import { useTranslation } from "react-i18next";
// import { AuthContext } from "../providers/AuthProvider";
import { TabsPanel } from "./TabsPanel";

const useStyles = makeStyles(theme => ({
	home: {
    fontSize: "1.5em",
	},
}));

function Home() {
	const classes = useStyles();
  // const { auth } = useContext(AuthContext);
  // const { t } = useTranslation();

  return (
    <div className={classes.home}>
      {/* {(typeof auth.user !== "undefined") && // if auth.user is undefined, we don't know yet about user authentication...
        `${t("Home")} ${t("for")} ${auth.user ? t("authenticated user") : t("guest user")} ${auth.user ? auth.user.email : ""}`
      } */}
      <TabsPanel />
    </div>
  );
}

export default React.memo(Home);