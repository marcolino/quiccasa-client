import React/*, { useContext }*/ from "react";
import { makeStyles } from "@material-ui/core/styles";
//import { AuthContext } from "../providers/AuthProvider";

const useStyles = makeStyles(theme => ({
	privacy: {
	},
}));

export default function Privacy() {
	const classes = useStyles();
  //const { auth } = useContext(AuthContext);

  return (
    <div className={classes.privacy}>
      {`Privacy`} {/* TODO */}
   </div>
  );
}