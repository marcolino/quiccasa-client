import React, { useContext/*, useEffect*/ } from "react";
import { makeStyles } from "@material-ui/styles";
import { AuthContext } from "../providers/AuthProvider";
//import { toast } from "./Toasts";

const useStyles = makeStyles(theme => ({
	home: {
    fontSize: '1.5em',
/*
 *  fontSize: calc([minimum size] + ([maximum size] - [minimum size]) * ((100vw - [minimum viewport width]) / ([maximum viewport width] - [minimum viewport width])));
 */
  //   fontSize: "16px",
  //   "@media screen and (min-width: 320px)": {
  //     fontSize: "calc(16px + 6 * ((100vw - 320px) / 680))",
  //   },
  //   "@media screen and (min-width: 1000px)": {
  //     fontSize: "22px",
  //   }
  //   //fontSize: '1.5em',
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
h 1 <br />
h 2 <br />
h 3 <br />
h 4 <br />
h 5 <br />
h 6 <br />
h 7 <br />
h 8 <br />
h 9 <br />
h 0 <br />
h 1 <br />
h 2 <br />
h 3 <br />
h 4 <br />
h 5 <br />
h 6 <br />
h 7 <br />
h 8 <br />
h 9 <br />
h 0 <br />
h 1 <br />
h 2 <br />
h 3 <br />
h 4 <br />
h 5 <br />
h 6 <br />
h 7 <br />
h 8 <br />
h 9 <br />
h 0 <br />
h 1 <br />
h 2 <br />
h 3 <br />
h 4 <br />
h 5 <br />
h 6 <br />
h 7 <br />
h 8 <br />
h 9 <br />
h 0 <br />
h 1 <br />
h 2 <br />
h 3 <br />
h 4 <br />
h 5 <br />
h 6 <br />
h 7 <br />
h 8 <br />
h 9 <br />
h 0 <br />
h 1 <br />
h 2 <br />
h 3 <br />
h 4 <br />
h 5 <br />
h 6 <br />
h 7 <br />
h 8 <br />
h 9 <br />
h 0 <br />
    </div>
  );
}