import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Auth } from "aws-amplify";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Person from "@material-ui/icons/Person";
import Lock from "@material-ui/icons/Lock";
import { FacebookIcon, TwitterIcon, GoogleIcon } from "../FederatedIcons";
import { toast } from "../Toasts";
import { FormInput, FormButton, FormText, FormDividerWithText } from "../FormElements";
import { AuthContext } from "../../providers/AuthProvider";
import { StatusContext } from "../../providers/StatusProvider";
import { validateEmail, checkPassword } from "../../libs/Validation";

const styles = theme => ({
  avatar: {
    backgroundColor: theme.palette.success.main,
  },
  link: {
    color: theme.palette.success.main,
  },
  rememberMe: {
    marginLeft: theme.spacing(0.2),
    color: theme.palette.success.main,
  },
  forgotPassword: {
    marginLeft: "auto",
    marginRight: theme.spacing(0.2),
    color: theme.palette.success.main,
  }
});
const useStyles = makeStyles((theme) => (styles(theme)));

const SignIn = () => {
  const classes = useStyles();
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [disabled, setDisabled] = useState(false);
  const [error, setError] = useState({ email: null, password: null });
  const { setAuth } = useContext(AuthContext);
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

    return true;
  };

  const signIn = (e) => {
    e.preventDefault();
    if (disabled) return;
    if (!validateForm()) return;
    setDisabled(true);
    setError({ email: null, password: null });

    Auth.signIn({
      username: email,
      password,
    })
      .then((user) => {
        setAuth({isAuthenticated: true, user});
        if (!rememberMe) {
          localStorage.clear();
        }
        setEmail("");
        setPassword("");
        history.push("/");
      })
      .catch((err) => {
        toast.error(err);
      })
      .finally(() => {
        setDisabled(false);
      })
    ;
  };

  const federatedSignIn = (e, provider) => {
    e.preventDefault();
    if (disabled) return;
    setDisabled(true);

    Auth.federatedSignIn({
      provider,
    })
      .then((user) => {
        setAuth({isAuthenticated: true, user});
        setEmail("");
        setPassword("");
        //history.push("/"); // TODO: check if we need this, when social sign in will work...
      })
      .catch((err) => {
        toast.error(err);
      })
      .finally(() => {
        setDisabled(false);
      })
    ;
  };

  return (
    <Container maxWidth="xs">

      <form className={classes.form} noValidate autoComplete="off">

        <Box m={1} />

        <Grid container justify="center">
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
        </Grid>

        <Box m={3} />

        <Grid container justify="flex-start">
          <FormText>
            {"Sign in with a social account"}
          </FormText>
        </Grid>

        <FormButton
          social={"Facebook"}
          startIcon={<FacebookIcon />}
          onClick={(e) => federatedSignIn(e, 'Facebook')}
          disabled={disabled}
        >
          {"Facebook"}
        </FormButton>
        <FormButton
          social={"Twitter"}
          startIcon={<TwitterIcon />}
          onClick={(e) => federatedSignIn(e, 'Twitter')}
          disabled={disabled}
        >
          {"Twitter"}
        </FormButton>
        <FormButton
          social={"Google"}
          startIcon={<GoogleIcon />}
          onClick={(e) => federatedSignIn(e, 'Google')}
          disabled={disabled}
        >
          {"Google"}
        </FormButton>

        <FormDividerWithText>
          <FormText>
            <i>{"or"}</i>
          </FormText>
        </FormDividerWithText>

        <Grid container justify="flex-start">
          <FormText>
            {"Sign in with email and password"}
          </FormText>
        </Grid>

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

        <Box m={1} />

        <FormButton
          onClick={signIn}
          disabled={disabled}
        >
          {"Sign In"}
        </FormButton>

        <Grid container alignItems="center">
          <Grid className={classes.rememberMe}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className={classes.rememberMe}
                  color="primary"
                  size="small"
                  disabled={disabled}
                />
              }
              label={
                <FormText>
                  {"Remember me"}
                </FormText>
              }
            />
          </Grid>
          <Grid className={classes.forgotPassword}>
            <Link
              href="/forgot-password"
              className={classes.forgotPassword}
              disabled={disabled}
            >
              {"Forgot Password?"}
            </Link>
          </Grid>
        </Grid>

        <FormDividerWithText />

        <Grid container direction="row" justify="center" spacing={1}>
          <Grid item>
            <FormText>
              {"Don't have an account?"}
            </FormText>
          </Grid>
          <Grid item>
            <Link
              href="/signup"
              className={classes.link}
              disabled={true}
            >
              <FormText>
                {"Register Now!"}
              </FormText>
            </Link>
          </Grid>
        </Grid>

      </form>

    </Container>
  );
}

export default SignIn;
