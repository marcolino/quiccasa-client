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
  // TODO... FacebookIcon,
  // TODO... TwitterIcon,
  // TODO... GoogleIcon,
} from "./FederatedIcons";
import { shadeColor } from "../libs/Styling";
import { capitalize } from "../libs/Misc";



export const FormInput = (props) => {
  const styles = theme => ({
    textField: {
    },
    // input: {
    //   "&:-webkit-autofill::first-line": { // does not work...
    //     fontFamily: "Open Sans",
    //     fontSize: "1.1em",
    //   },
    // },
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
  });
  const useStyles = makeStyles((theme) => (styles(theme)));
  const classes = useStyles();

  return (
    <TextField
      id={props.id}
      type={props.type}
      value={props.value}
      required={props.required}
      autoFocus={props.autoFocus}
      autoComplete={props.autoComplete.toString()}
      variant={props.variant}
      fullWidth={props.fullWidth}
      label={props.label}
      size={props.size}
      margin={props.margin}
      className={props.className ? props.className : classes.textField}
      placeholder={props.placeholder}
      onChange={e => props.onChange(e.target.value)}
      disabled={props.disabled}
      error={props.error !== null}
      InputProps={{
        startAdornment: props.startAdornmentIcon ? (
          <InputAdornment
            className={props.startAdornmentClass ? props.startAdornmentClass : classes.startAdornment}
            position="start"
          >
            {props.startAdornmentIcon}
          </InputAdornment>
        ) : (<></>),
        endAdornment: props.endAdornmentIcon ? (
          <InputAdornment
            className={props.endAdornmentClass ? props.endAdornmentClass : classes.endAdornment}
            position="end"
          >
            {props.endAdornmentIcon}
          </InputAdornment>
        ) : (<></>),
        className: classes.input,
      }}
    />
  );
}

FormInput.propTypes = {
  // id: PropTypes.string,
  // type: PropTypes.oneOf([
  //   "button",
  //   "checkbox",
  //   "color",
  //   "date",
  //   "datetime-local",
  //   "email",
  //   "file",
  //   "hidden",
  //   "image",
  //   "month",
  //   "number",
  //   "password",
  //   "radio",
  //   "range",
  //   "reset",
  //   "search",
  //   "submit",
  //   "tel",
  //   "text",
  //   "time",
  //   "url",
  //   "week",
  // ]),
  value: PropTypes.string.isRequired,
  // onChange: PropTypes.func,
  // required: PropTypes.bool,
  // autoFocus: PropTypes.bool,
  // autoComplete: PropTypes.bool,
  // className: PropTypes.object,
  // variant: PropTypes.oneOf([
  //   "filled",
  //   "outlined",
  //   "standard",
  // ]),
  // fullWidth: PropTypes.bool,
  // label: PropTypes.string,
  // size: PropTypes.oneOf([
  //   "small",
  //   "medium",
  // ]),
  // margin: PropTypes.oneOf([
  //   "none",
  //   "normal",
  //   "dense",
  // ]),
  // placeholder: PropTypes.string,
  startAdornmentClass: PropTypes.string,
  startAdornmentIcon: PropTypes.object,
  endAdornmentClass: PropTypes.string,
  endAdornmentIcon: PropTypes.object,
  disabled: PropTypes.bool,
  error: PropTypes.string,
};

FormInput.defaultProps = {
  type: "text",
  required: false,
  autoFocus: false,
  autoComplete: false,
  variant: "outlined",
  fullWidth: true,
  label: "",
  size: "small",
  margin: "dense",
  className: null,
  placeholder: "",
  startAdornmentClass: null,
  endAdornmentClass: null,
  disabled: false,
  error: "",
};



export const FormButton = (props) => {
  const styles = theme => ({
    submit: {
      margin: theme.spacing(1, 0, 0, 0),
      textTransform: "none",
      fontSize: "1.3em",
      color: "white",
      backgroundColor: theme.palette.success.main,
      "&:hover": {
        backgroundColor: shadeColor(theme.palette.success.main, -25),
      },
    },
    submitFederated: {
      margin: theme.spacing(1, 0, 0, 0),
      justifyContent: "flex-start",
      paddingLeft: theme.spacing(5),
      fontSize: "1.3em",
    },  
    submitFederatedFacebook: {
      backgroundColor: theme.palette.facebook,
      "&:hover": {
        backgroundColor: shadeColor(theme.palette.facebook, -25),
      },
    },
    submitFederatedTwitter: {
      backgroundColor: theme.palette.twitter,
      "&:hover": {
        backgroundColor: shadeColor(theme.palette.twitter, -25),
      },
    },
    submitFederatedGoogle: {
      backgroundColor: theme.palette.google,
      "&:hover": {
        backgroundColor: shadeColor(theme.palette.google, -25),
      },
    },
  
  });
  const useStyles = makeStyles((theme) => (styles(theme)));
  const classes = useStyles();

  return (
    <Button
      fullWidth={props.fullWidth}
      variant={props.variant}
      color={props.color}
      className={`${classes.submit} ${props.social ? classes.submitFederated : ""} ${props.social ? classes["submitFederated" + capitalize(props.social)] : ""} ${props.className}`}
      startIcon={props.startIcon}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </Button>
  );
}

FormButton.propTypes = {
  social: PropTypes.oneOf([
    "Facebook",
    "Twitter",
    "Google",
  ]),
}

FormButton.defaultProps = {
  fullWidth: true,
  variant: "contained",
  color: "primary",
  social: null,
};



export const FormCheckbox = (props) => {
  const styles = theme => ({
    rememberMe: {
      marginLeft: theme.spacing(0.2),
      color: theme.palette.success.main,
    },
    rememberMeLabel: {
      fontSize: "0.875em",
    },
  });
  const useStyles = makeStyles((theme) => (styles(theme)));

  const classes = useStyles();

  return (
    <FormControlLabel
      control={
        <Checkbox
          checked={props.checked}
          onChange={(e) => props.onChange(e.target.checked)}
          className={`${props.className} ${classes.rememberMe}`}
          color={props.color}
          size={props.size}
          disabled={props.disabled}
        />
      }
      label={
        <Typography
          // className={classes.rememberMeLabel}
          className={`${props.classNameLabel} ${classes.rememberMeLabel}`}
        >
          {props.children}
        </Typography>
      }
    />
  );
}

FormCheckbox.propTypes = {
};

FormCheckbox.defaultProps = {
  checked: false,
  color: "primary",
  size: "small",
};



export const FormText = (props) => {
  return (
    <Typography
      component={props.component}
      variant={props.variant}
      {...props}
    >
      {props.children}
    </Typography>
  );
};

FormText.propTypes = {
};

FormText.defaultProps = {
  component: "h1",
  variant: "body2",
};


export const FormAvatar = (props) => {
  // TODO...
  return (
    <Typography
      {...props}
    >
      {props.children}
    </Typography>
  );
};

FormAvatar.propTypes = {
};

FormAvatar.defaultProps = {
};



export const FormDividerWithText = (props) => {
  const styles = theme => ({
    container: {
      display: "flex",
      alignItems: "center",
      marginTop: theme.spacing(props.marginVertical),
      marginBottom: theme.spacing(props.marginVertical),
    },
    divider: {
      width: "100%",
      borderBottom: "1px solid " + (props.color ? props.color : theme.palette.primary.dark),
      paddingLeft: theme.spacing(1),
    },
    text: {
      paddingLeft: theme.spacing(props.paddingHorizontal),
      paddingRight: theme.spacing(props.paddingHorizontal),
    },
  });
  const useStyles = makeStyles((theme) => (styles(theme)));
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.divider} />
      {props.children && <span className={classes.text}>
        {props.children}
      </span>}
      <div className={classes.divider} />
    </div>
  );
};

FormDividerWithText.propTypes = {
  color: PropTypes.string,
  marginVertical: PropTypes.oneOf([ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ]),
  paddingHorizontal: PropTypes.oneOf([ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ]),
};

FormDividerWithText.defaultProps = {
  marginVertical: 3,
  paddingHorizontal: 1,
};
