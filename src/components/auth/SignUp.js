import React, { useState, useEffect } from "react";
import { useHistory, Link as RouterLink } from "react-router-dom";
import { usePromiseTracker } from "react-promise-tracker";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@material-ui/styles";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import AccountCircleOutlined from "@material-ui/icons/AccountCircleOutlined";
import ConfirmationNumber from "@material-ui/icons/ConfirmationNumber";
import Person from "@material-ui/icons/Person";
import Email from "@material-ui/icons/Email";
import Lock from "@material-ui/icons/Lock";
import { signUp, resendSignUp, confirmSignUp } from "../../libs/TrackPromise";
import { toast } from "../Toast";
import { FormInput, FormButton, FormText, FormLink } from "../FormElements";
import { validateEmail, checkPassword } from "../../libs/Validation";
import config from "../../config";

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
  fieldset: {
    border: 0,
  },
  dialogContent: {
    whiteSpace: "pre-line", // to enable whitespaces in dialog content
  },
});
const useStyles = makeStyles((theme) => (styles(theme)));



function SignUp() {
  const classes = useStyles();
  const history = useHistory();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmed, setPasswordConfirmed] = useState("");
  const [codeDeliveryMedium, setCodeDeliveryMedium] = useState("");
  const [waitingForCode, setWaitingForCode] = useState(false);
  const [code, setCode] = useState("");
  const [error, setError] = useState({});
  const [formState, setFormState] = useState({ xs: true, horizontalSpacing: 0 });
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogTitle, setDialogTitle] = useState(null);
  const [dialogContent, setDialogContent] = useState(null);
  const [dialogCallback, setDialogCallback] = useState(null);
  const { promiseInProgress } = usePromiseTracker({ delay: config.spinner.delay });
  const { t } = useTranslation();

  const handleOpenDialog = (title, content, callback) => {
    setDialogTitle(title);
    setDialogContent(content);
    setDialogCallback(callback);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setDialogTitle(null);
    setDialogContent(null);
    dialogCallback && dialogCallback();
  };

  // set up event listener to set correct grid rowSpacing based on inner width
  useEffect(() => {
    const setResponsiveness = () => {
      window.innerWidth < config.extraSmallWatershed
        ? setFormState((prevState) => ({ ...prevState, xs: true, rowSpacing: 0 }))
        : setFormState((prevState) => ({ ...prevState, xs: false, rowSpacing: 2 }));
    };
    setResponsiveness();
    window.addEventListener("resize", () => setResponsiveness());
    return () => {
      window.removeEventListener("resize", () => setResponsiveness());
    };
  }, []);

  const validateFormStep1 = () => {
    
    // validate email formally
    if (!validateEmail(email)) {
      const err = t("Please supply a valid email");
      setError({ email: err });
      toast.warning(err);
      return false;
    }

    // check for password presence
    if (!password) {
      const err = t("Please supply a password");
      setError({ password: err });
      toast.warning(err);
      return false;
    }

    // check password for minimum complexity
    if (!checkPassword(password)) {
      const err = t("Please supply a more complex password");
      setError({ password: err });
      toast.warning(err);
      return false;
    }

    if (!passwordConfirmed) {
      const err = t("Please confirm the password");
      setError({ passwordConfirmed: err });
      toast.warning(err);
      return false;
    }

    if (password !== passwordConfirmed) {
      const err = t("The confirmed password does not match the password");
      setError({ passwordConfirmed: err });
      toast.warning(err);
      return false;
    }

    return true;
  };

  const validateFormStep2 = () => {
    if (code.length <= 0) {
      setError({ code: t("Code is mandatory")});
      return false;
    }
    return true;
  };

  const formSignUp = (e) => {
    e.preventDefault();
    if (!validateFormStep1()) return;
    setError({});

    signUp({
      email,
      password,
      firstName,
      lastName,
      /**
       * IMPROVE: add custom fields
       * phone_number: phoneNumber, // E.164 number convention: country code (1 to 3 digits) + subscriber number (max 12 digits)
       * "custom:favorite_flavor": FavoriteFlavour, // custom attribute, not standard
       */
    }, {
      success: (data) => {
        console.log("signUp success:", data);
        const medium = data.codeDeliveryMedium.toLowerCase();
        toast.info(t("Confirmation code just sent by {{medium}}", {medium}));
        setCodeDeliveryMedium(medium);
        setWaitingForCode(true);
        setPassword("");
      },
      error: (err) => {
console.error("signup error:", err);
        switch (err.code) {
          case "UsernameExistsException":
            setError({ email: err.message }); // since we use email as username, we blame email field as guilty
            toast.warning(t(err.message));
            break;
          default:
            setError({}); // we don't know whom to blame
            toast.error(t(err.message));
          }
      },
    });
  };

  const formConfirmSignUp = (e) => {
    e.preventDefault();
    if (!validateFormStep2()) return;
    setError({});

    confirmSignUp({email, code}, {
      success: (data) => {
        console.log("confirmSignup success:", data);
        // data is not meaningful
        handleOpenDialog(
          t("Registered successfully"),
          t("You can now sign in with email and password") + ".",
          () => formSignUpCompleted
        );
      },
      error: (err) => {
console.error("confirmSignUp error:", err);
        toast.error(t(err.message));
        setError({ code: err.message});
      },
    });
  };
  
  const formResendSignUpCode = (e) => {
    e.preventDefault();
    setError({});

    resendSignUp(email, {
      success: (data) => {
        toast.info(t("Code resent successfully by {{codeDeliveryMedium}}", {codeDeliveryMedium}));
      },
      error: (err) => {
console.error("resendSignUp error:", err);
        toast.error(t(err.message));
        setError({ code: err.message});
      },
    });
  };
  
  const formSignUpCompleted = () => {
    setWaitingForCode(false);
    setEmail("");
    setCode("");
    history.push("/signin");
  };

  return (
    <Container maxWidth="xs">

      <form className={classes.form} noValidate autoComplete="off">
        <fieldset disabled={promiseInProgress} className={classes.fieldset}>
          {!waitingForCode && (
            <>

              <Box m={1} />

              <Grid container justifyContent="center">
                <Avatar className={classes.avatar}>
                  <AccountCircleOutlined />
                </Avatar>
              </Grid>

              <Box m={3} />

              <Grid container justifyContent="flex-start">
                <FormText>
                  {t("Register with your data")}
                </FormText>
              </Grid>

              <Box m={1} />

              <Grid container direction={"row"} spacing={formState.rowSpacing} >
                <Grid item xs={12} sm={6}>
                  <FormInput
                    autoFocus
                    id={"firstName"}
                    value={firstName}
                    onChange={setFirstName}
                    placeholder={t("First Name")}
                    startAdornmentIcon={<Person />}
                    error={error.firstName}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormInput
                    id={"lastName"}
                    value={lastName}
                    onChange={setLastName}
                    placeholder={t("Last Name")}
                    startAdornmentIcon={<Person />}
                    error={error.lastName}
                  />
                </Grid>
              </Grid>

              <FormInput
                id={"email"}
                value={email}
                onChange={setEmail}
                placeholder={t("Email")}
                startAdornmentIcon={<Email />}
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

              <FormInput
                id={"passwordConfirmed"}
                type="password"
                value={passwordConfirmed}
                onChange={setPasswordConfirmed}
                placeholder={t("Password confirmation")}
                startAdornmentIcon={<Lock />}
                error={error.passwordConfirmed}
              />

              <Box m={1} />

              <FormButton
                onClick={formSignUp}
              >
                {t("Sign Up")}
              </FormButton>

              <Box m={3} />

              <Grid container justifyContent="flex-start">
                <FormText component="h6" variant="caption" color="textSecondary" align="center">
                  {t("By signing up you agree to our")} <FormLink component={RouterLink} to="/terms-of-use" color="textPrimary">{t("terms of use")}</FormLink> {" "}
                  {t("and you confirm you have read our")} <FormLink component={RouterLink} to="/privacy-policy" color="textPrimary">{t("privacy policy")}</FormLink>
                  {", "} {t("including cookie use")} {"."}
                </FormText>
              </Grid>

              <Box m={1} />

            </>
          )}
          {waitingForCode && (
            <>
              <FormInput
                id={"signUpCode"}
                type="number"
                value={code}
                onChange={setCode}
                placeholder={t("Numeric code just received by {{codeDeliveryMedium}}", {codeDeliveryMedium})}
                startAdornmentIcon={<ConfirmationNumber />}
                error={error.code}
              />

              <FormButton
                onClick={formConfirmSignUp}
              >
                {t("Confirm Sign Up")}
              </FormButton>

              <Grid container justifyContent="flex-end">
                <FormButton
                  onClick={formResendSignUpCode}
                  fullWidth={false}
                  className={"buttonSecondary"}
                >
                  {t("Resend code")}
                </FormButton>
              </Grid>
            </>
          )}
        </fieldset>
      </form>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {dialogTitle}
        </DialogTitle>
        <DialogContent id="alert-dialog-description">
          <Typography variant="body1" className={classes.dialogContent}>
            {dialogContent}
          </Typography>
        </DialogContent>
        <DialogActions>
          <FormButton
            onClick={handleCloseDialog}
            fullWidth={false}
            className={"buttonSecondary"}
            autoFocus
          >
            {t("Ok")}
          </FormButton>
        </DialogActions>
      </Dialog>
      
    </Container>
  );
}

export default React.memo(SignUp);
