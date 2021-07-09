import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Auth } from "aws-amplify";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Person from "@material-ui/icons/Person";
import Lock from "@material-ui/icons/Lock";
import {
  FacebookIcon,
  TwitterIcon,
  GoogleIcon,
} from "../IconFederatedSignin";
import { FormInput, DividerWithText } from "../FormElements";
import { AuthContext } from "../../providers/AuthProvider";
import { StatusContext } from "../../providers/StatusProvider";
import { shadeColor } from "../../libs/Styling";

const styles = theme => ({
  paper: {
    marginTop: theme.spacing(1), // TODO: this should depend on window.height
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(2),
    backgroundColor: theme.palette.primary.dark,
  },
  form: {
    width: "100%", // fix IE 11 issue
    margin: theme.spacing(-1),
  },
  submit: {
    margin: theme.spacing(3, 0, 1, 0),
    color: "white",
    textTransform: "none",
    fontSize: "1.5em",
    backgroundColor: theme.palette.success.main,
    "&:hover": {
      backgroundColor: shadeColor(theme.palette.success.main, -25),
    },
  },
  submitFederatedSignInFacebook: {
    margin: theme.spacing(2, 0, 0, 0),
    justifyContent: 'flex-start',
    paddingLeft: theme.spacing(5),
    fontSize: "1.2em",
    backgroundColor: theme.palette.facebook,
    "&:hover": {
      backgroundColor: shadeColor(theme.palette.facebook, -25),
    },
  },
  submitFederatedSignInTwitter: {
    margin: theme.spacing(1, 0, 0, 0),
    justifyContent: 'flex-start',
    paddingLeft: theme.spacing(5),
    fontSize: "1.2em",
    backgroundColor: theme.palette.twitter,
    "&:hover": {
      backgroundColor: shadeColor(theme.palette.twitter, -25),
    },
  },
  submitFederatedSignInGoogle: {
    margin: theme.spacing(1, 0, 0, 0),
    justifyContent: 'flex-start',
    paddingLeft: theme.spacing(5),
    fontSize: "1.2em",
    backgroundColor: theme.palette.google,
    "&:hover": {
      backgroundColor: shadeColor(theme.palette.google, -25),
    },
  },
  textField: {
    color: "#333",
    backgroundColor: "#fff !important",
    "&::placeholder": {
      textOverflow: "ellipsis !important",
      color: "#444",
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
  text: {
    fontSize: "1.1em",
  },
  link: {
    color: theme.palette.success.main,
    fontSize: "1.1em",
  },
  rememberMe: {
    marginLeft: theme.spacing(0.2),
    color: theme.palette.success.main,
  },
  rememberMeLabel: {
    fontSize: "0.875em",
  },
  forgotPassword: {
    fontSize: "1em",
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
  const { setAuth } = useContext(AuthContext);
  const { setStatus } = useContext(StatusContext);

  useEffect(() => {
    setStatus({showFooter: false});
  }, [setStatus]);

  const signIn = (e) => {
    e.preventDefault();
    if (disabled) return;
    setDisabled(true);

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
        console.error(err);
      })
    ;
  };

  const federatedSignIn = (e, provider) => {
    e.preventDefault();

    Auth.federatedSignIn({
      provider,
    })
      .then((user) => {
        setAuth({isAuthenticated: true, user});
        setEmail("");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>

        <Grid container justify="center">
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
        </Grid>
        <Grid container justify="flex-start">
          <Typography component="h1" variant="body2">
            {"Sign in with a social account"}
          </Typography>
        </Grid>
{/* 
        <Grid container alignItems="center" justify="center" spacing={10}>
          <Grid item>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
          </Grid>
        </Grid>
        <Grid container direction="row" justify="flex-start" spacing={10}>
          <Grid item>
            <Typography component="h1" variant="body2">
              {"Sign in with a social account"}
            </Typography>
          </Grid>
        </Grid> */}

        {/* <Grid container direction="row" alignItems="flex-start" j_ustify="center">
          <Grid item>
            <Typography component="h5" variant="body1">
              {"Sign in with a social account"}
            </Typography>
            </Grid>
        </Grid> */}

        <form className={classes.form} noValidate autoComplete="off">
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={`${classes.submit} ${classes.submitFederatedSignInFacebook}`}
            startIcon={<FacebookIcon />}
            onClick={(e) => federatedSignIn(e, 'Facebook')}
          >
            {"Facebook"}
          </Button>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={`${classes.submit} ${classes.submitFederatedSignInTwitter}`}
            startIcon={<TwitterIcon />}
            onClick={(e) => federatedSignIn(e, 'Twitter')}
          >
            {"Twitter"}
          </Button>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            className={`${classes.submit} ${classes.submitFederatedSignInGoogle}`}
            startIcon={<GoogleIcon />}
            onClick={(e) => federatedSignIn(e, 'Google')}
          >
            {"Google"}
          </Button>
          {/* <DividerWithText> {"or"} </DividerWithText> */}
          <DividerWithText>
            <Typography component="h1" variant="body2">
              <i>{"or"}</i>
            </Typography>
          </DividerWithText>

          <Grid container justify="flex-start">
            <Typography component="h1" variant="body2">
              {"Sign in with email and password"}
            </Typography>
          </Grid>

          <FormInput
            id={"email"}
            value={email}
            onChange={setEmail}
            placeholder={"Email"}
            startAdornmentIcon={<Person />}
            margin={"dense"}
          />
          <FormInput
            id={"password"}
            type="password"
            value={password}
            onChange={setPassword}
            placeholder={"Password"}
            startAdornmentIcon={<Lock />}
            margin={"dense"}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={(e) => signIn(e)}
            disabled={disabled}
          >
            {"Sign In"}
          </Button>
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
                  />
                }
                _label={"Remember me"}
                label={
                  <Typography className={classes.rememberMeLabel}>
                    {"Remember me"}
                  </Typography>
                }
              />
            </Grid>
            <Grid className={classes.forgotPassword}>
              <Link href="/forgot-password" className={classes.forgotPassword}>
                {"Forgot Password?"}
              </Link>
            </Grid>
          </Grid>

          <DividerWithText />

          <Grid container direction="row" alignItems="center" justify="center" spacing={1}>
            <Grid item>
              {/* <Typography className={classes.text}> */}
              <Typography component="h1" variant="body2">
                {"Don't have an account?"} {" "}
              </Typography>
            </Grid>
            <Grid item>
              <Link href="/signup" className={classes.link}>
                {"Register Now!"}
              </Link>
            </Grid>
          </Grid>

        </form>
      </div>

    </Container>
  );
}

export default SignIn;
