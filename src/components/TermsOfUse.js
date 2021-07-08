import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
	termsofuse: {
	},
}));

export default function TermsOfUse() {
	const classes = useStyles();

  return (
    <div className={classes.termsofuse}>
      {`Terms of Use`} {/* TODO */}
   </div>
  );
}