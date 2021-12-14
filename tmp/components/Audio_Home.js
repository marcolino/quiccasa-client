import React from "react";
import { useContext } from "react";
import { makeStyles } from "@material-ui/styles";
import { useTranslation } from "react-i18next";
import { AuthContext } from "../providers/AuthProvider";
// import Player from "../components/Audio";
// import soundLocal from "../assets/sounds/mixkit-little-cute-kiss-2192.wav";
// //const soundRemote = "http://streaming.tdiradio.com:8000/house.mp3";

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
        `${t("Home")} ${t("for")} ${auth.isAuthenticated ? t("authenticated user") : t("guest user")} ${auth.isAuthenticated ? auth.user.email : ""}`
      }
      {/* <Player url={soundLocal} /> */}
    </div>
  );
}

export default React.memo(Home);