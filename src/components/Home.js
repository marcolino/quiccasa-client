import React, { useContext/*, useEffect*/ } from "react";
import { makeStyles } from "@material-ui/styles";
import { AuthContext } from "../providers/AuthProvider";
//import { toast } from "./Toasts";

const useStyles = makeStyles(theme => ({
	home: {
    fontSize: '1.5em',
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
      {`Home for ${auth.isAuthenticated ? 'authenticated' : 'guest'} user ${auth.isAuthenticated ? auth.user.attributes.email : ''}`}
    </div>
  );
}