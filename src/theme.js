//import { createMuiTheme } from "@material-ui/core/styles";
import { unstable_createMuiStrictModeTheme as createMuiTheme } from "@material-ui/core/styles"; // TEMPORARY: temporary, to solve material-ui drawer "findDOMNode is deprecated in StrictModefindDOMNode is deprecated in StrictMode" warning
import blueGrey from '@material-ui/core/colors/blueGrey';
import lime from '@material-ui/core/colors/lime';
import red from '@material-ui/core/colors/red';
import grey from '@material-ui/core/colors/grey';

export default createMuiTheme({
  typography: {
    fontFamily: [
      'Open Sans',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
  overrides: {
    MuiInputBase: {
      input: {
        '&:-webkit-autofill': {
          transitionDelay: '9999s',
          transitionProperty: 'background-color, color',
        },
      },
    },
  },
  palette: {
    primary: {
      light: blueGrey[100],
      main: blueGrey[200],
      dark: blueGrey[300],
    },
    secondary: {
      light: lime[200],
      main: lime[300],
      dark: lime[400],
    },
    notch: { // TODO: change name, more universal
      light: grey[200],
      main: '#eaedf0',
      dark: grey[800],
    },
    headerBackground: {
      light: blueGrey[100],
      main: blueGrey[200],
      dark: blueGrey[300],
    },
    headerForeground: {
      light: grey[500],
      main: grey[700],
      dark: grey[900],
    },
    facebook: '#1877f2',
    twitter: '#1da1f2',
    google: '#db4437',
  },
  status: {
    danger: red[700],
  }
});
