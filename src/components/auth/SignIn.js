import React, { useState, useContext } from "react";
import { useHistory/*, Redirect*/ } from "react-router-dom";
import { usePromiseTracker } from "react-promise-tracker";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@material-ui/styles";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Person from "@material-ui/icons/Person";
import Lock from "@material-ui/icons/Lock";
//import i18n from "i18next";
//import { signIn/*, federatedSignIn*/ } from "../../libs/TrackPromise";
import { signIn/*, federatedSignIn*/ } from "../../libs/Fetch";
import { FacebookIcon, GoogleIcon } from "../IconFederated";
import { toast } from "../Toast";
import { FormInput, FormButton, FormText, FormDividerWithText, /*FormCheckbox,*/ FormLink } from "../FormElements";
import { AuthContext } from "../../providers/AuthProvider";
import { OnlineStatusContext } from "../../providers/OnlineStatusProvider";
import { validateEmail } from "../../libs/Validation";
import config from "../../config";

const styles = theme => ({
  avatar: {
    backgroundColor: theme.palette.success.main,
  },
  // rememberMe: {
  //   color: theme.palette.success.main,
  // },
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



function SignIn() {
  const classes = useStyles();
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState({});
  const { setAuth } = useContext(AuthContext);
  const isOnline = useContext(OnlineStatusContext);
  /* UNUSED */ const { promiseInProgress } = usePromiseTracker({delay: config.spinner.delay});
  const { t } = useTranslation();

  const onlineCheck = () => {
    if (!isOnline) {
      toast.warning("Sorry, we are currently offline. Please wait for the network to become available.");
      return false;
    }
    return true;
  };

  const validateForm = () => {   
    // validate email formally
    if (!validateEmail(email)) {
      const err = "Please supply a valid email";
      setError({ email: err });
      toast.warning(err);
      return false;
    }

    if (!password) {
      const err = "Please supply a password";
      setError({ password: err });
      toast.warning(err);
      return false;
    }

    return true;
  };

  const formSignIn = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    if (!onlineCheck()) return;
    setError({});

    signIn({
      email,
      password,
    }).then(data => {
      if (!data.ok) {
        console.warn("signIn error:", data);
        toast.error(t(data.message));
        setError({});
        return;
      }
      console.log("signIn success:", data);
      // TODO: do we need tokens here?
      setAuth({ user: { ...data.user, accessToken: data.accessToken, refreshToken: data.refreshToken }});
      // if (!rememberMe) {
      //   localStorage.clear(); // TODO...
      // }
      setEmail("");
      setPassword("");
      history.push("/");
    }).catch(err => {
      console.error("signIn error catched:", err);
      toast.error(t(err.message));
      setError({}); // we can't blame some user input, it's a server side error
    });
  };

  const formFederatedSignIn = (e, provider) => {
    e.preventDefault();
    if (!validateForm()) return;
    if (!onlineCheck()) return;
    setError({});

    window.open("/api/auth/loginGoogle", "_self");

    // federatedSignIn().then(data => {
    //   console.log("federatedSignIn calling setAuth - data:", data);
    //   // TODO: do we need tokens here?
    //   setAuth({ user: { ...data.user, accessToken: data.accessToken, refreshToken: data.refreshToken }});
    //   if (!rememberMe) {
    //     localStorage.clear();
    //   }
    //   setEmail("");
    //   setPassword("");
    //   history.push("/");
    // }).catch(err => {
    //   console.error("federatedSignIn error:", err);
    //   toast.error(t(err.message));
    //   setError({}); // we don't know whom to blame
    // });
  };

console.log("config.federatedSigninProviders.length:", config.federatedSigninProviders.length);
  return (
    <Container maxWidth="xs">

      <form className={classes.form} noValidate autoComplete="off">
        <fieldset disabled={promiseInProgress} className={classes.fieldset}>

          <Box m={0} />

          <Grid container justifyContent="center">
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
          </Grid>

          <Box m={2} />

          <Grid container justifyContent="flex-start">
            <FormText>
              {t("Sign in with email and password")}
            </FormText>
          </Grid>

          <Box m={0} />

          <FormInput
            autoFocus
            id={"email"}
            value={email}
            onChange={setEmail}
            placeholder={t("Email")}
            startAdornmentIcon={<Person />}
            error={error.email}
          />

          <FormInput
            id={"password"}
            type="password"
            value={password}
            onChange={setPassword}
            placeholder={t("Password")}
            startAdornmentIcon={<Lock />}
            error={error.password}
          />

          <Box m={1} />

          <FormButton
            onClick={formSignIn}
          >
            {t("Sign In")}
          </FormButton>

          <Grid container alignItems="center">
            <Grid className={classes.columnLeft}>
              {/* <FormCheckbox
                checked={rememberMe}
                onChange={setRememberMe}
                className={classes.rememberMe}
              >
                {t("Remember me")}
              </FormCheckbox> */}
            </Grid>
            <Grid className={classes.columnRight} style={{marginTop: 5}}>
              <FormLink
                href="/forgot-password"
                className={classes.forgotPassword}
              >
                {t("Forgot Password?")}
              </FormLink>
            </Grid>
          </Grid>

          <Box m={2} />

          <Grid container direction="row" justifyContent="center" spacing={1}>
            <Grid item>
              <FormText>
                {t("Don't have an account?")}
              </FormText>
            </Grid>
            <Grid item>
              <FormLink
                href="/signup"
                className={classes.signUp}
              >
                {t("Register Now!")}
              </FormLink>
            </Grid>
          </Grid>

          {!!config.federatedSigninProviders.length && (
            <>
              <Box m={3} />

              <FormDividerWithText>
                <FormText>
                  <i>{t("or")}</i>
                </FormText>
              </FormDividerWithText>

              <Box m={3} />

              <Grid container justifyContent="flex-start">
                <FormText>
                  {t("Sign in with a social account")}
                </FormText>
              </Grid>

              <Box m={0} />

              {
                config.federatedSigninProviders.map(provider => (
                  <FormButton
                    key={provider}
                    social={provider}
                    startIcon={
                      provider === "Facebook" ? <FacebookIcon /> :
                      provider === "Google" ? <GoogleIcon /> :
                      <GoogleIcon />
                    }
                    onClick={(e) => formFederatedSignIn(e, provider)}
                  >
                    {provider}
                  </FormButton>
                ))
              }
            </>
          )}
        </fieldset>
      </form>

    </Container>
  );
}

export default React.memo(SignIn);
