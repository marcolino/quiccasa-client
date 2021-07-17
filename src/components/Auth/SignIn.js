import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { signIn, federatedSignIn } from "../AuthPromise";
import { usePromiseTracker } from "react-promise-tracker";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Person from "@material-ui/icons/Person";
import Lock from "@material-ui/icons/Lock";
import { FacebookIcon, TwitterIcon, GoogleIcon } from "../FederatedIcons";
import { toast } from "../Toasts";
import { FormInput, FormButton, FormText, FormDividerWithText, FormCheckbox, FormLink } from "../FormElements";
import { AuthContext } from "../../providers/AuthProvider";
import { validateEmail, checkPassword } from "../../libs/Validation";
import config from "../../config.json";

const styles = theme => ({
  avatar: {
    backgroundColor: theme.palette.success.main,
  },
  rememberMe: {
    color: theme.palette.success.main,
  },
  forgotPassword: {
    color: theme.palette.success.main,
  },
  signUp: {
    color: theme.palette.success.main,
  },
  columnLeft: {
    marginLeft: theme.spacing(0.2),
  },
  columnRight: {
    marginLeft: "auto",
    marginRight: theme.spacing(0.2),
  },
  fieldset: {
    border: 0,
  },
});
const useStyles = makeStyles((theme) => (styles(theme)));



export default function SignIn() {
  const classes = useStyles();
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState({});
  const { setAuth } = useContext(AuthContext);
  const { promiseInProgress } = usePromiseTracker({delay: config.spinner.delay});

  const validateForm = () => {
    
    // validate email formally
    if (!validateEmail(email)) {
      const err = "Please supply a valid email";
      setError({ email: err });
      toast.error(err);
      return false;
    }

    // check password for minimum complexity
    if (!checkPassword(password)) {
      const err = "Please supply a more complex password";
      setError({ password: err });
      toast.error(err);
      return false;
    }

    return true;
  };

  const formSignIn = (e) => {
    e.preventDefault();
    if (promiseInProgress) return;
    if (!validateForm()) return;
    setError({});

    signIn({
      username: email,
      password,
    }, {
      success: (user) => {
        setAuth({isAuthenticated: true, user});
        if (!rememberMe) {
          localStorage.clear();
        }
        setEmail("");
        setPassword("");
        history.push("/");
      },
      error: (err) => {
        console.error('signIn error data:', err);
        toast.error(err.message);
        setError({}); // we don't know whom to blame
      },
    });
  };

  const formFederatedSignIn = (e, provider) => {
    e.preventDefault();
    if (promiseInProgress) return;

    federatedSignIn({
      provider,
    }, {
      success: (user) => {
        setAuth({isAuthenticated: true, user});
        setEmail("");
        setPassword("");
        //history.push("/"); // TODO: check if we need this, when social sign in will work...
      },
      error: (err) => {
        toast.error(err);
      },
    });
  };

  return (
    <Container maxWidth="xs">

      <form className={classes.form} noValidate autoComplete="off">
        <fieldset disabled={promiseInProgress} className={classes.fieldset}>

          <Box m={1} />

          <Grid container justify="center">
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
          </Grid>

          <Box m={3} />

          <Grid container justify="flex-start">
            <FormText>
              {"Sign in with email and password"}
            </FormText>
          </Grid>

          <Box m={1} />

          <FormInput
            id={"email"}
            value={email}
            onChange={setEmail}
            placeholder={"Email"}
            startAdornmentIcon={<Person />}
            error={error.email}
          />

          <FormInput
            id={"password"}
            type="password"
            value={password}
            onChange={setPassword}
            placeholder={"Password"}
            startAdornmentIcon={<Lock />}
            error={error.password}
          />

          <Box m={1} />

          <FormButton
            onClick={formSignIn}
          >
            {"Sign In"}
          </FormButton>

          <Grid container alignItems="center">
            <Grid className={classes.columnLeft}>
              <FormCheckbox
                checked={rememberMe}
                onChange={setRememberMe}
                className={classes.rememberMe}
              >
                {"Remember me"}
              </FormCheckbox>
            </Grid>
            <Grid className={classes.columnRight}>
              <FormLink
                href="/forgot-password"
                className={classes.forgotPassword}
              >
                {"Forgot Password?"}
              </FormLink>
            </Grid>
          </Grid>

          <Box m={3} />

          <Grid container direction="row" justify="center" spacing={1}>
            <Grid item>
              <FormText>
                {"Don't have an account?"}
              </FormText>
            </Grid>
            <Grid item>
              <FormLink
                href="/signup"
                className={classes.signUp}
              >
                {"Register Now!"}
              </FormLink>
            </Grid>
          </Grid>

          <Box m={3} />

          <FormDividerWithText>
            <FormText>
              <i>{"or"}</i>
            </FormText>
          </FormDividerWithText>

          <Box m={3} />

          <Grid container justify="flex-start">
            <FormText>
              {"Sign in with a social account"}
            </FormText>
          </Grid>

          <Box m={1} />

          <FormButton
            social={"Facebook"}
            startIcon={<FacebookIcon />}
            onClick={(e) => formFederatedSignIn(e, 'Facebook')}
          >
            {"Facebook"}
          </FormButton>
          <FormButton
            social={"Twitter"}
            startIcon={<TwitterIcon />}
            onClick={(e) => formFederatedSignIn(e, 'Twitter')}
          >
            {"Twitter"}
          </FormButton>
          <FormButton
            social={"Google"}
            startIcon={<GoogleIcon />}
            onClick={(e) => formFederatedSignIn(e, 'Google')}
          >
            {"Google"}
          </FormButton>

        </fieldset>
      </form>

    </Container>
  );
}
