import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import { shadeColor } from "../libs/Styling";
import { capitalize, isEmptyObject } from "../libs/Misc";



const FormInput = React.memo((props) => {
  const styles = theme => ({
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
      error={!isEmptyObject(props.error)}
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
});

FormInput.propTypes = {
  value: PropTypes.string.isRequired,
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



const FormButton = React.memo((props) => {
  const styles = theme => ({
    button: {
      margin: theme.spacing(1, 0, 0, 0),
      textTransform: "none",
      fontSize: "1.3em",
      color: "white", // TODO
      backgroundColor: theme.palette.success.main,
      "&:hover": {
        backgroundColor: shadeColor(theme.palette.success.main, -25),
      },
    },
    buttonSecondary: {
      margin: theme.spacing(1, 0, 0, 0),
      textTransform: "none",
      fontSize: "1em !important",
      color: "white", // TODO
      backgroundColor: theme.palette.secondary.dark + " !important",
      "&:hover": {
        backgroundColor: shadeColor(theme.palette.secondary.dark, -25)  + " !important",
      },
    },
    buttonFederated: {
      margin: theme.spacing(1, 0, 0, 0),
      justifyContent: "flex-start",
      paddingLeft: theme.spacing(5),
      fontSize: "1.3em",
    },  
    buttonFederatedFacebook: {
      backgroundColor: theme.palette.socialButtons.facebook.backgroundColor,
      "&:hover": {
        backgroundColor: shadeColor(theme.palette.socialButtons.facebook.backgroundColor, -25),
      },
    },
    buttonFederatedGoogle: {
      backgroundColor: theme.palette.socialButtons.google.backgroundColor,
      "&:hover": {
        backgroundColor: shadeColor(theme.palette.socialButtons.google.backgroundColor, -25),
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
      size={props.size}
      className={`${classes.button} ${props.social ? classes.buttonFederated : ""} ${props.social ? classes["buttonFederated" + capitalize(props.social)] : ""} ${classes[props.className]}`}
      startIcon={props.startIcon}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </Button>
  );
});

FormButton.propTypes = {
  social: PropTypes.oneOf([
    "Facebook",
    "Google",
  ]),
}

FormButton.defaultProps = {
  fullWidth: true,
  variant: "contained",
  color: "primary",
  social: null,
};



const FormCheckbox = React.memo((props) => {
  const styles = theme => ({
    disabled: {
      color: "grey",
      cursor: "default",
      "&:hover": {
        textDecoration: "none",
      },
    },
  });
  const useStyles = makeStyles((theme) => (styles(theme)));
  const classes = useStyles();

  const classNameDisabled = props.disabled ? classes.disabled : "";

  return (
    <FormControlLabel
      control={
        <Checkbox
          checked={props.checked}
          onChange={(e) => props.onChange(e.target.checked)}
          className={`${props.className} ${classNameDisabled}`}
          color={props.color}
          size={props.size}
          disabled={props.disabled}
        />
      }
      label={
        <FormText
          className={`${props.className} ${classNameDisabled}`}
        >
          {props.children}
        </FormText>
      }
    />
  );
});

FormCheckbox.propTypes = {
};

FormCheckbox.defaultProps = {
  checked: false,
  color: "primary",
  size: "small",
};



const FormText = React.memo((props) => {
  return (
    <Typography
      component={props.component}
      variant={props.variant}
      color={props.color}
      align={props.align}
      {...props}
    >
      {props.children}
    </Typography>
  );
});

FormText.propTypes = {
};

FormText.defaultProps = {
  component: "h1",
  variant: "body2",
  color: "textPrimary",
};



const FormLink = React.memo((props) => {
  const styles = theme => ({
    normal: {
      cursor: "pointer",
    },
    disabled: {
      color: "grey",
      cursor: "default",
      "&:hover": {
        textDecoration: "none",
        color: "grey",
      },
    },
  });
  const useStyles = makeStyles((theme) => (styles(theme)));
  const classes = useStyles();

  const className = props.disabled ? classes.disabled : classes.normal;

  return (
    <Link
      href={props.href}
      className={`${props.className} ${className}`}
      color={props.color}
      {...props}
    >
      {props.children}
    </Link>
  );
});

FormLink.propTypes = {
};

FormLink.defaultProps = {
  color: "textPrimary",
};



const FormDividerWithText = React.memo((props) => {
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
});

FormDividerWithText.propTypes = {
  color: PropTypes.string,
  marginVertical: PropTypes.oneOf([ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ]),
  paddingHorizontal: PropTypes.oneOf([ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ]),
};

FormDividerWithText.defaultProps = {
  marginVertical: 1,
  paddingHorizontal: 1,
};

export {FormInput, FormButton, FormCheckbox, FormText, FormLink, FormDividerWithText};
