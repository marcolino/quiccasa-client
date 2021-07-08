import React, { useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AuthContext } from "../../providers/AuthProvider";
import { StatusContext } from "../../providers/StatusProvider";

const useStyles = makeStyles(theme => ({
	profile: {
    fontSize: '1.5em',
	},
}));

export default function Profile() {
	const classes = useStyles();
  const { auth } = useContext(AuthContext);
  const { setStatus } = useContext(StatusContext);

  useEffect(() => {
    setStatus({showFooter: false});
  }, [setStatus]);

  return (
    <div className={classes.profile}>
      {`Profile for ${auth.isAuthenticated ? 'authenticated' : 'guest'} user ${auth.isAuthenticated ? auth.user.attributes.email : ''}`}
   </div>
  );
}