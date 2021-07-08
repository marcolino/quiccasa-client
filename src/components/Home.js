import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AuthContext } from "../providers/AuthProvider";

const useStyles = makeStyles(theme => ({
	home: {
    fontSize: '1.5em',
	},
}));

export default function Home() {
	const classes = useStyles();
  const { auth } = useContext(AuthContext);

  return (
    <div className={classes.home}>
      {`Home for ${auth.isAuthenticated ? 'authenticated' : 'guest'} user ${auth.isAuthenticated ? auth.user.attributes.email : ''}`}
    </div>
  );
}