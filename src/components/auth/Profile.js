import React, { useContext } from "react";
import { makeStyles } from "@material-ui/styles";
import { AuthContext } from "../../providers/AuthProvider";

const useStyles = makeStyles(theme => ({
	profile: {
    fontSize: "1.5em",
	},
}));

export default function Profile() {
	const classes = useStyles();
  const { auth } = useContext(AuthContext);

  return (
    <div className={classes.profile}>
      {`Profile for ${auth.isAuthenticated ? "authenticated" : "guest"} user ${auth.isAuthenticated ? auth.user.attributes.email : ""}`}  
   </div>
  );
}