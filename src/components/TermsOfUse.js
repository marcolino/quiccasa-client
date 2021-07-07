import React/*, {useContext }*/ from "react";
import { makeStyles } from "@material-ui/core/styles";
//import { AuthContext } from "../providers/AuthProvider";

const useStyles = makeStyles(theme => ({
	termsofuse: {
	},
}));

export default function TermsOfUse() {
	const classes = useStyles();
  //const { auth } = useContext(AuthContext);

  return (
    <div className={classes.termsofuse}>
      {`Terms of Use`}
   </div>
  );
}