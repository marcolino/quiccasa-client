//import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
//import Person from "@material-ui/icons/Person";
// TODO... import Lock from "@material-ui/icons/Lock";
import {
  FacebookIcon,
  // TODO... TwitterIcon,
  // TODO... GoogleIcon,
} from "./IconFederatedSignin";

const styles = theme => ({
  submit: {
    margin: theme.spacing(3, 0, 1, 0),
    color: "white",
    backgroundColor: theme.palette.success.main,
    textTransform: "none",
    fontSize: "1.5em",
  },
  submitFederatedSignInFacebook: {
    margin: theme.spacing(2, 0, 0, 0),
    backgroundColor: theme.palette.facebook,
    justifyContent: 'flex-start',
    paddingLeft: theme.spacing(5),
    fontSize: "1.2em",
  },
  // submitFederatedSignInTwitter: {
  //   margin: theme.spacing(1, 0, 0, 0),
  //   backgroundColor: theme.palette.twitter,
  //   justifyContent: 'flex-start',
  //   paddingLeft: theme.spacing(5),
  //   fontSize: "1.2em",
  // },
  // submitFederatedSignInGoogle: {
  //   margin: theme.spacing(1, 0, 0, 0),
  //   backgroundColor: theme.palette.google,
  //   justifyContent: 'flex-start',
  //   paddingLeft: theme.spacing(5),
  //   fontSize: "1.2em",
  // },
  textField: {
    color: "red", //"#333",
    backgroundColor: "#fff",
    "&::placeholder": {
      textOverflow: "ellipsis",
      color: "green", //"#444",
      backgroundColor: "yellow",
    },
    "& .MuiOutlinedInput-root": {
      backgroundColor: "#fff",
    },
  },
  startAdornment: {
    backgroundColor: "#eaedf0",
    height: "2.5rem",
    maxHeight: "3rem",
    marginLeft: -15,
    marginRight: 5,
    paddingLeft: 10,
    paddingRight: 10,
    borderRight: "1px solid #c5c5c5",
  },
  endAdornment: {
    backgroundColor: "#eaedf0",
    height: "2.5rem",
    maxHeight: "3rem",
    marginLeft: 5,
    marginRight: -15,
    paddingLeft: 10,
    paddingRight: 10,
    borderLeft: "1px solid #c5c5c5",
  },
  rememberMe: {
    marginLeft: theme.spacing(0.2),
    color: theme.palette.success.main,
  },
  rememberMeLabel: {
    fontSize: "0.875em",
  },
});
const useStyles = makeStyles((theme) => (styles(theme)));

export const FormInput = (props) => {
  const classes = useStyles();

  return (
    <TextField
      id={props.id}
      value={props.value}
      required={props.required}
      autoFocus={props.autoFocus}
      autoComplete={props.autoComplete.toString()}
      variant={props.variant}
      fullWidth={props.fullWidth}
      label={props.label}
      size={props.size}
      className={props.className ? props.className : classes.textField}
      placeholder={"Email sdfjkgjkdlfsg jksdfdfkjh gkjsdfg kjsdfgkjfdshg sgsfg kgjkh."}
      type="text"
      onChange={e => props.onChange(e.target.value)}
      InputProps={{
        startAdornment: (
          <InputAdornment
            className={props.startAdornmentClass ? props.startAdornmentClass : classes.startAdornment}
            position="start"
          >
            {props.startAdornmentIcon}
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment
            className={props.endAdornmentClass ? props.endAdornmentClass : classes.endAdornment}
            position="end"
          >
            {props.endAdornmentIcon}
          </InputAdornment>
        ),
      }}
    />
  );
}

FormInput.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  required: PropTypes.bool,
  autoFocus: PropTypes.bool,
  autoComplete: PropTypes.bool,
  variant: PropTypes.oneOf([
    "filled",
    "outlined",
    "standard",
  ]),
  fullWidth: PropTypes.bool,
  label: PropTypes.string,
  size: PropTypes.oneOf([
    "small",
    "medium",
  ]),
  placeholder: PropTypes.string,
  type: PropTypes.string,
  startAdornmentClass: PropTypes.string,
  startAdornmentIcon: PropTypes.object,
  endAdornmentClass: PropTypes.string,
  endAdornmentIcon: PropTypes.object,
/*
  value={props.value}
  onChange={e => props.setValue(e.target.value)}
  InputProps={{
    startAdornment: (
      <InputAdornment
        className={props.startAdornmentClass ? props.startAdornmentClass : classes.startAdornment}
        position="start"
      >
        {props.startAdornmentIcon}
  name: PropTypes.oneOf([
    'LogoMain',
    'LogoTest',
  ]).isRequired,
*/
};

FormInput.defaultProps = {
  required: false,
  autoFocus: false,
  autoComplete: false,
  variant: "outlined",
  fullWidth: true,
  label: "",
  size: "small",
  className: null,
  placeholder: "",
  type: "text",
  startAdornmentClass: null,
  endAdornmentClass: null,
};



export const FormButton = (props) => {
  const classes = useStyles();

  return (
    <Button
      type="submit"
      fullWidth
      variant="contained"
      color="primary"
      className={`${classes.submit} ${classes.submitFederatedSignInFacebook}`}
      startIcon={<FacebookIcon />}
      onClick={(e) => props.onClick(e, 'Facebook')} //federatedSignIn(e, 'Facebook')}
    >
      {"Sign in with Facebook"}
    </Button>
  );
}

export const FormCheckbox = (props) => {
  const classes = useStyles();

  return (
    <FormControlLabel
      control={
        <Checkbox
          checked={props.checked} //rememberMe}
          onChange={(e) => props.onChange(e.target.checked)} //setRememberMe(e.target.checked)}
          className={classes.rememberMe}
          color="primary"
          size="small"
        />
      }
      label={
        <Typography className={classes.rememberMeLabel}>
          {"Remember me"}
        </Typography>
      }
    />
  );
}
