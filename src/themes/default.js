import { createTheme } from "@material-ui/core/styles";
//import { createMuiTheme } from "@material-ui/core/styles";
//import { unstable_createMuiStrictModeTheme as createMuiTheme } from "@material-ui/core/styles"; // TEMPORARY: temporary, to solve material-ui drawer "findDOMNode is deprecated in StrictModefindDOMNode is deprecated in StrictMode" warning
//import blueGrey from "@material-ui/core/colors/blueGrey";
import lightGreen from "@material-ui/core/colors/lightGreen";
import grey from "@material-ui/core/colors/grey";
import amber from "@material-ui/core/colors/amber";

export default createTheme({
  typography: {
    fontFamily: `-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Open Sans', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif`,
  },
  overrides: {
    MuiInputBase: {
      input: {
        "&:-webkit-autofill": {
          transitionDelay: "9999s",
          transitionProperty: "background-color, color",
        },
      },
    },
  },
  palette: {
    primary: {
      light: "#42c2f5",
      main: "rgba(0,0,0,0.5)",
      dark: "#778899",
      //contrastText: "red", //"#fff"
      // light: blueGrey[100],
      // main: blueGrey[200],
      // dark: blueGrey[300],
      contrastText: "white",
    },
    secondary: {
      light: lightGreen[100],
      main: lightGreen[300],
      dark: lightGreen[500],
    },
    header: {
      color: grey[900],
      backgroundColor: amber[50],
    },
    socialButtons: {
      facebook: {
        backgroundColor: "#1877f2",
      },
      google: {
        backgroundColor: "#db4437",
      },
    },
  },
});
