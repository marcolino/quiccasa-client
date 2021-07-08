import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AuthContext } from "../providers/AuthProvider";

const useStyles = makeStyles(theme => ({
	searches: {
    fontSize: '1.5em',
	},
}));

export default function Searches() {
	const classes = useStyles();
  const { auth } = useContext(AuthContext);

  return (
    <div className={classes.searches}>
      {`Searches for ${auth.isAuthenticated ? 'authenticated' : 'guest'} user`}
   </div>
  );
}