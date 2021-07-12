import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Auth } from "aws-amplify";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import AccountCircleOutlined from "@material-ui/icons/AccountCircleOutlined";
import ConfirmationNumber from "@material-ui/icons/ConfirmationNumber";
import Person from "@material-ui/icons/Person";
import Lock from "@material-ui/icons/Lock";
import { toast } from "../Toasts";
import { FormInput, FormButton, FormText } from "../FormElements";
import { StatusContext } from "../../providers/StatusProvider";
import { shadeColor } from "../../libs/Styling";
import { validateEmail, checkPassword } from "../../libs/Validation";

const styles = theme => ({
  avatar: {
    backgroundColor: theme.palette.success.main,
  },
  columnLeft: {
    marginLeft: theme.spacing(0.2),
  },
  columnRight: {
    marginLeft: "auto",
    marginRight: theme.spacing(0.2),
  },
  resendCode: {
    fontSize: "1em !important",
    backgroundColor: theme.palette.secondary.dark + " !important",
    "&:hover": {
      backgroundColor: shadeColor(theme.palette.secondary.dark, -25)  + " !important",
    },
  }
});
const useStyles = makeStyles((theme) => (styles(theme)));

export default function SignUp() {
  const classes = useStyles();
  const history = useHistory();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmed, setPasswordConfirmed] = useState("");
  const [waitingForCode, setWaitingForCode] = useState(false);
  //const [warning, setWarning] = useState(null);
  const [code, setCode] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [error, setError] = useState({ firstName: null, lastName: null, email: null, password: null, passwordConfirmed: null, code: null });
  //const { setAuth } = useContext(AuthContext);
  const { setStatus } = useContext(StatusContext);

  useEffect(() => {
    setStatus({showFooter: false});
  }, [setStatus]);

  const validateForm = () => {
    
    // validate email formally
    if (!validateEmail(email)) {
      const err = "Please supply a valid email";
      setError({ ...error, email: err });
      toast.error(err);
      return false;
    }

    // check password for minimum complexity
    if (!checkPassword(password)) {
      const err = "Please supply a more complex password";
      setError({ ...error, password: err });
      toast.error(err);
      return false;
    }

    if (password !== passwordConfirmed) {
      const err = "The confirmed password does not match the password";
      setError({ ...error, password: err });
      toast.error(err);
      return false;
    }

    return true;
  };

  const signUp = (e) => {
    e.preventDefault();
    if (disabled) return;
    
    if (!validateStep1()) return;

    if (!validateForm()) return;
    setDisabled(true);
    setError({ email: null, password: null }); // ...

    Auth.signUp({ username: email, password, attributes: { email, name: firstName, family_name: lastName } })
      .then((data) => {
        console.log('signUp:', data);
        setWaitingForCode(true);
        setPassword("");
        //setWarning(null);
        //history.push("/");
console.info('waitingForCode', waitingForCode);
        toast.info("Confirmation code just sent..."); // TODO...
      })
      .catch((err) => {
        //setWarning(err.message);
        toast.error(err.message);
console.error(err);
      })
      .finally(() => {
        setDisabled(false);
      })
    ;
  };

  const validateStep1 = () => {
    if (email.length <= 0) {
      //setWarning("Email is mandatory");
      setError({ ...error, email: "Email is mandatory"});
      return false;
    }
    if (password.length <= 0) {
      //setWarning("Password is mandatory");
      setError({ ...error, password: "Password is mandatory"});
      return false;
    }
    if (password !== passwordConfirmed) {
      //setWarning("Passwords do not match");
      setError({ ...error, passwordConfirmed: "Passwords do not match"});
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    if (code.length <= 0) {
      //setWarning("Code is mandatory");
      setError({ ...error, code: "Code is mandatory"});
      return false;
    }
    return true;
  };

  const confirmSignUp = (e) => {
    e.preventDefault();
    
    if (!validateStep2()) {
      return;
    }

    Auth.confirmSignUp(email, code)
      .then((data) => {
        console.log('confirmSignUp:', data);
        if (data === "SUCCESS") {
          toast.success("Registered successfully. You can now sign in with email and password.")
        } else {
          toast.error(data); // TODO: check data error format from cognito...
        }
        setWaitingForCode(false);
        setEmail("");
        setCode("");
        //setWarning(null);
        history.push("/signin");
      })
      .catch((err) => {
        //setWarning(err.message);
        toast.error(err);
      })
    ;
  };
  
  const resendCode = () => {
    Auth.resendSignUp(email)
      .then(() => {
        //setWarning(null);
        toast.info("Code resent successfully");
      })
      .catch((err) => {
        //setWarning(err.message);
        setError({ ...error, code: err.message}); // add code
      });
  };
  
  
  return (
    <Container maxWidth="xs">

      <form className={classes.form} noValidate autoComplete="off">
        {!waitingForCode && (
          <>

            <Box m={1} />

            <Grid container justify="center">
              <Avatar className={classes.avatar}>
                <AccountCircleOutlined />
              </Avatar>
            </Grid>

            <Box m={3} />

            <Grid container justify="flex-start">
              <FormText>
                {"Register with your data"}
              </FormText>
            </Grid>

            <Box m={1} />

            <FormInput
              id={"firstName"}
              value={firstName}
              onChange={setFirstName}
              placeholder={"First Name"}
              startAdornmentIcon={<Person />}
              disabled={disabled}
              error={error.firstName}
            />

            <FormInput
              id={"lastName"}
              value={lastName}
              onChange={setLastName}
              placeholder={"Last Name"}
              startAdornmentIcon={<Person />}
              disabled={disabled}
              error={error.lastName}
            />

            <FormInput
              id={"email"}
              value={email}
              onChange={setEmail}
              placeholder={"Email"}
              startAdornmentIcon={<Person />}
              disabled={disabled}
              error={error.email}
            />

            <FormInput
              id={"password"}
              type="password"
              value={password}
              onChange={setPassword}
              placeholder={"Password"}
              startAdornmentIcon={<Lock />}
              disabled={disabled}
              error={error.password}
            />

            <FormInput
              id={"passwordConfirmed"}
              type="password"
              value={passwordConfirmed}
              onChange={setPasswordConfirmed}
              placeholder={"Password confirmation"}
              startAdornmentIcon={<Lock />}
              disabled={disabled}
              error={error.passwordConfirmed}
            />

            <Box m={1} />

            <FormButton
              onClick={signUp}
              disabled={disabled}
            >
              {"Sign Up"}
            </FormButton>

          </>
        )}
        {waitingForCode && (
          <>
            <FormInput
              id={"signUpCode"} // TODO: signUpCode => confirmationCode
              type="number"
              value={code}
              onChange={setCode}
              placeholder={"Numeric code just received by email"} // TODO: EMAIL / SMS
              startAdornmentIcon={<ConfirmationNumber />}
              disabled={disabled}
              error={error.password}
            />

            <FormButton
              onClick={confirmSignUp}
            >
              Confirm Sign Up
            </FormButton>

            <Grid container justify="flex-end">
              <FormButton
                onClick={resendCode}
                fullWidth={false}
                className={classes.resendCode}
              >
                Resend code
              </FormButton>
            </Grid>
          </>
        )}
      </form>

    </Container>
  );
}