import React, { useState } from "react";
import { useHistory } from "react-router-dom";
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
import LockOpenOutlined from "@material-ui/icons/LockOpenOutlined";
import ConfirmationNumber from "@material-ui/icons/ConfirmationNumber";
import Lock from "@material-ui/icons/Lock";
import LockOpen from "@material-ui/icons/LockOpen";
// TODO: do not use trackpromise, but "../../libs/Fetch" ...
//import { forgotPassword, forgotPasswordSubmit, resendResetPasswordCode } from "../../libs/TrackPromise";
import { forgotPassword, forgotPasswordSubmit, resendResetPasswordCode } from "../../libs/Fetch";
import { toast } from "../Toast";
import { FormInput, FormButton, FormText } from "../FormElements";
import { validateEmail, checkPassword } from "../../libs/Validation";
import config from "../../config";

const styles = theme => ({
  avatar: {
    backgroundColor: theme.palette.success.main,
  },
  fieldset: {
    border: 0,
  },
});
const useStyles = makeStyles((theme) => (styles(theme)));

function ForgotPassword() {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmed, setPasswordConfirmed] = useState("");
  const [error, setError] = useState({ email: null, password: null, passwordConfirmed: null, code: null });
  const [waitingForCode, setWaitingForCode] = useState(false);
  const [codeDeliveryMedium, setCodeDeliveryMedium] = useState("");
  const [code, setCode] = useState("");
  const history = useHistory();
  const { promiseInProgress } = usePromiseTracker({delay: config.spinner.delay});
  const [openDialog1, setOpenDialog1] = useState(false);
  const [dialogTitle1, setDialogTitle1] = useState(null);
  const [dialogContent1, setDialogContent1] = useState(null);
  //const [dialogCallback1, setDialogCallback1] = useState(null);
  const [openDialog2, setOpenDialog2] = useState(false);
  const [dialogTitle2, setDialogTitle2] = useState(null);
  const [dialogContent2, setDialogContent2] = useState(null);
  //const [dialogCallback2, setDialogCallback2] = useState(null);
  const { t } = useTranslation();

  const handleOpenDialog1 = (title, content) => {
    setDialogTitle1(title);
    setDialogContent1(content);
    setOpenDialog1(true);
  };

  const handleCloseDialog1 = (cb) => {
    setOpenDialog1(false);
    setDialogTitle1(null);
    setDialogContent1(null);
    //cb();
  };

  const handleOpenDialog2 = (title, content) => {
    setDialogTitle2(title);
    setDialogContent2(content);
    setOpenDialog2(true);
  };

  const handleCloseDialog2 = () => {
    setOpenDialog2(false);
    setDialogTitle2(null);
    setDialogContent2(null);
    //dialogCallback2();
    history.push("/signin"); 
  };

  const validateForm = () => { // validate email formally
    if (!waitingForCode) {
      if (!validateEmail(email)) {
        const err = t("Please supply a valid email");
        toast.warning(err);
        setError({ email: err });
        return false;
      }
    }

    if (waitingForCode) {
      if (!checkPassword(password)) {
        const err = t("Please supply a more complex password");
        toast.warning(err);
        setError({ password: err });
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
        toast.warning(err);
        setError({ passwordConfirmed: err });
        return false;
      }
    }

    return true;
  }

  const formForgotPassword = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setError({});

    console.log("formForgotPassword");
    forgotPassword({
      email
    }).then(data => {
      if (!data.ok) {
        console.warn("forgotPassword error:", data);
        toast.error(t(data.message));
        setError({ email: data.message}); // TODO: should we always blame email input for error?
        return;
      }
      console.log("forgotPassword success:", data);
      setWaitingForCode(true);
      setPassword("");
      switch (data.codeDeliveryMedium) {
        default: // in future we could treat EMAIL/SMS/... separately...
          // TODO
          // const medium = data.CodeDeliveryDetails.AttributeName;
          // const email = data.CodeDeliveryDetails.Destination;
          const medium = "email";
          const email = "marcosolari+6@gmail.com";
          setCodeDeliveryMedium(medium);
          ///toast.info(`Verification code sent via ${medium} to ${email}.\nPlease open it and copy and paste it here.`);
          handleOpenDialog1(
            t("Verification code sent"),
            t(`\
Verification code sent via {{medium}} to {{email}}.
Please copy and paste it here.`, {medium, email}),
            () => {},
          );
      }
    });
  };
  
  const formConfirmForgotPassword = (e) => {
    e.preventDefault();
    setError({});
    
    forgotPasswordSubmit({email, code, password, passwordConfirmed}).then(data => {
      if (!data.ok) {
        console.warn("forgotPasswordSubmit error:", data);
        toast.error(t(data.message));
        setError({ password: data.message}); // TODO: check whom to blame for error
        return;
      }
      console.log("17 confirmForgotPasswordSubmit success data:", data);
      setWaitingForCode(false);
      setEmail("");
      setPassword("");
      setPasswordConfirmed("");
      setCode("");
      handleOpenDialog2(
        t(`Password reset success`),
        t(`You can now sign in with your new password`),
      );
      //history.push("/signin");
    });
  };
  
  const formResendResetPasswordCode = (e) => {
    e.preventDefault();
    setError({});

console.log("formResendResetPasswordCode");
    resendResetPasswordCode({email}).then(data => {
      if (!data.ok) {
        console.warn("formResendResetPasswordCode error:", data);
        switch (data.code) {
          case "ExpiredCodeException":
            setError({ confirmationCode: data }); // blame confirmationCode field as guilty
            break;
          default:
            setError({}); // we don't know whom to blame
        }
        toast.error(t(data.message));
        return;
      }
      console.log("TODO: CHECK IF IN DATA WE HAVE MESSAGE TO SHOW TO THE USER resendResetPasswordCode success data:", data);
      toast.info("Code resent successfully");
    });
  };

  return (
    <Container maxWidth="xs">

      <form className={classes.form} noValidate autoComplete="off">
        <fieldset disabled={promiseInProgress} className={classes.fieldset}>
          {!waitingForCode && (
            <>

{/* <FormButton onClick={formTestETBT}>{"TEST ETBT"}</FormButton> */}

              <Box m={1} />

              <Grid container justifyContent="center">
                <Avatar className={classes.avatar}>
                  <LockOpenOutlined />
                </Avatar>
              </Grid>

              <Box m={3} />

              <Grid container justifyContent="flex-start">
                <FormText>
                  {t("Reset password")}
                </FormText>
              </Grid>

              <Box m={1} />

              <FormInput
                autoFocus
                id={"email"}
                value={email}
                onChange={setEmail}
                placeholder={t("Email")}
                startAdornmentIcon={<LockOpen />}
                error={error.email}
              />

              <Box m={1} />

              <FormButton
                onClick={formForgotPassword}
              >
                {t("Request password reset")}
              </FormButton>
              
            </>
          )}
          {waitingForCode && (
            <>

              <FormInput
                id={"password"}
                type="password"
                value={password}
                onChange={setPassword}
                placeholder={t("New password")}
                startAdornmentIcon={<Lock />}
                error={error.password}
              />

              <FormInput
                id={"passwordConfirmed"}
                type="password"
                value={passwordConfirmed}
                onChange={setPasswordConfirmed}
                placeholder={t("New password confirmation")}
                startAdornmentIcon={<Lock />}
                error={error.passwordConfirmed}
              />

              <FormInput
                id={"confirmationCode"}
                type="number"
                value={code}
                onChange={setCode}
                placeholder={t("Numeric code just received by {{codeDeliveryMedium}}", {codeDeliveryMedium})}
                startAdornmentIcon={<ConfirmationNumber />}
                error={error.confirmationCode}
              />

              <Box m={1} />

              <FormButton
                onClick={formConfirmForgotPassword}
              >
                {t("Confirm Password Reset")}
              </FormButton>

              <Grid container justifyContent="flex-end">
                <FormButton
                  onClick={formResendResetPasswordCode}
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
        open={openDialog1}
        onClose={handleCloseDialog1}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {dialogTitle1}
        </DialogTitle>
        <DialogContent id="alert-dialog-description">
          <Typography variant="body1" style={{whiteSpace: 'pre-line'}}>
            {dialogContent1}
          </Typography>
        </DialogContent>
        <DialogActions>
          <FormButton
            onClick={handleCloseDialog1}
            fullWidth={false}
            className={"buttonSecondary"}
            autoFocus
          >
            {t("Ok")}
          </FormButton>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openDialog2}
        onClose={handleCloseDialog2}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {dialogTitle2}
        </DialogTitle>
        <DialogContent id="alert-dialog-description">
          <Typography variant="body1" style={{whiteSpace: 'pre-line'}}>
            {dialogContent2}
          </Typography>
        </DialogContent>
        <DialogActions>
          <FormButton
            onClick={handleCloseDialog2}
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

export default React.memo(ForgotPassword);