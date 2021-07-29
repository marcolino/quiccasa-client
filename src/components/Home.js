import React, { useContext/*, useEffect*/ } from "react";
import { makeStyles } from "@material-ui/styles";
import { AuthContext } from "../providers/AuthProvider";
//import { toast } from "./Toasts";

const useStyles = makeStyles(theme => ({
	home: {
    fontSize: "1.5em",
	},
}));

export default function Home() {
	const classes = useStyles();
  const { auth } = useContext(AuthContext);

  // useEffect(() => {
  //   toast.info("Ciaoooo!");
  // }, []);
  
  return (
    <div className={classes.home}>
      {/* if auth.isAuthenticated is undefined, we don't know yet about user authentication... */}
      {`Home for ${auth.isAuthenticated ? "authenticated" : "guest"} user ${auth.isAuthenticated ? auth.user.attributes.email : ""}`}
{/*
      <br /> 1
      <br /> 2
      <br /> 3
      <br /> 4
      <br /> 5
      <br /> 6
      <br /> 7
      <br /> 8
      <br /> 9
      <br /> 0
      <br /> 1
      <br /> 2
      <br /> 3
      <br /> 4
      <br /> 5
      <br /> 6
      <br /> 7
      <br /> 8
      <br /> 9
      <br /> 0
      <br /> 1
      <br /> 2
      <br /> 3
      <br /> 4
      <br /> 5
      <br /> 6
      <br /> 7
      <br /> 8
      <br /> 9
      <br /> 0
*/}
   </div>
  );
}