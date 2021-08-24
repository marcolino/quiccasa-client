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
import { forgotPassword, forgotPasswordSubmit, resendResetPasswordCode } from "../../libs/TrackPromise";
import { toast } from "../Toasts";
import { FormInput, FormButton, FormText } from "../FormElements";
import { validateEmail, checkPassword } from "../../libs/Validation";
import config from "../../config";
import { ETBTAdd } from "../../libs/I18n"; // TODO: remove me when finished collecting serve errors

const styles = theme => ({
  avatar: {
    backgroundColor: theme.palette.success.main,
  },
  fieldset: {
    border: 0,
  },
});
const useStyles = makeStyles((theme) => (styles(theme)));

export default function ForgotPassword() {
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
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogTitle, setDialogTitle] = useState(null);
  const [dialogContent, setDialogContent] = useState(null);
  const { t } = useTranslation();

  const handleOpenDialog = (title, content) => {
    setDialogTitle(title);
    setDialogContent(content);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setDialogTitle(null);
    setDialogContent(null);
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

    forgotPassword(email, {
      success: (data) => {
        console.log("forgotPassword success:", data);
        setWaitingForCode(true);
        setPassword("");
        switch (data.CodeDeliveryDetails.DeliveryMedium) {
          default: // in future we could treat EMAIL/SMS/... separately...
            const medium = data.CodeDeliveryDetails.AttributeName;
            const email = data.CodeDeliveryDetails.Destination;
            setCodeDeliveryMedium(medium);
            ///toast.info(`Verification code sent via ${medium} to ${email}.\nPlease open it and copy and paste it here.`);
            handleOpenDialog(
              t("Verification code sent"),
              t(`\
Verification code sent via {{medium}} to {{email}}.
Please copy and paste it here.`, {medium, email})
            );
        }
      },
      error: (err) => {
console.error("forgotPassword error:", err);
ETBTAdd("forgotPassword", err);
        toast.error(t(err.message));
        setError({ email: err.message}); // TODO: should we always blame email input for error?
      }
    });
  };
  
  const formConfirmForgotPassword = (e) => {
    e.preventDefault();
    setError({});
    
    forgotPasswordSubmit(email, code, password, {
      success: data => {
        console.log("confirmForgotPassword success data:", data);
        setWaitingForCode(false);
        setEmail("");
        setPassword("");
        setPasswordConfirmed("");
        setCode("");
        ///toast.success(<div>Password reset successfully.<br />You can now sign in with your new password</div>);
        handleOpenDialog(`Password reset success`, `You can now sign in with your new password`);
        history.push("/signin");
      },
      error: (err) => {
console.error("confirmForgotPassword error:", err);
        ETBTAdd("confirmForgotPassword", err);
        toast.error(t(err.message));
        setError({ password: err.message}); // TODO: check whom to blame for error
      }
    });
  };
  
  const formResendResetPasswordCode = (e) => {
    e.preventDefault();
    setError({});

    resendResetPasswordCode('x'+email, {
      success: (data) => {
        console.log("resendResetPasswordCode success data:", data);
        toast.info("Code resent successfully");
      },
      error: (err) => {
console.error("resendResetPasswordCode error:", err);
ETBTAdd("resendResetPasswordCode", err);
        switch (err.code) {
          case "ExpiredCodeException":
            setError({ confirmationCode: err }); // blame confirmationCode field as guilty
            break;
          default:
            setError({}); // we don't know whom to blame
        }
        toast.error(t(err.message));
      },
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
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {dialogTitle}
        </DialogTitle>
        <DialogContent id="alert-dialog-description">
          <Typography variant="body1" style={{whiteSpace: 'pre-line'}}>
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
