import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { forgotPassword, forgotPasswordSubmit, resendResetPasswordCode } from "../AuthPromise";
import { usePromiseTracker } from "react-promise-tracker";
import { makeStyles } from "@material-ui/styles";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import LockOpenOutlined from "@material-ui/icons/LockOpenOutlined";
import ConfirmationNumber from "@material-ui/icons/ConfirmationNumber";
import Lock from "@material-ui/icons/Lock";
import LockOpen from "@material-ui/icons/LockOpen";
import { toast } from "../Toasts";
import { FormInput, FormButton, FormText } from "../FormElements";
import { validateEmail, checkPassword } from "../../libs/Validation";
import config from "../../config.json";

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


  const validateForm = () => { // validate email formally
    if (!waitingForCode) {
      if (!validateEmail(email)) {
        const err = "Please supply a valid email";
        toast.error(err);
        setError({ email: err });
        return false;
      }
    }

    if (waitingForCode) {
      if (!checkPassword(password)) {
        const err = "Please supply a more complex password";
        toast.error(err);
        setError({ password: err });
        return false;
      }

      if (!passwordConfirmed) {
        const err = "Please confirm the password";
        setError({ passwordConfirmed: err });
        toast.error(err);
        return false;
      }
  
      if (password !== passwordConfirmed) {
        const err = "The confirmed password does not match the password";
        toast.error(err);
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
        console.log('forgotPassword success data:', data);
        setWaitingForCode(true);
        setPassword("");
        switch (data.CodeDeliveryDetails.DeliveryMedium) {
          default: // in future we could treat EMAIL/SMS/... separately...
            const medium = data.CodeDeliveryDetails.AttributeName;
            const email = data.CodeDeliveryDetails.Destination;
            setCodeDeliveryMedium(medium);
            toast.info(`Verification code sent via ${medium} to ${email}.\nPlease open it and copy and paste it here.`);
        }
      },
      error: (err) => {
        console.error("forgotPassword error:", err);
        toast.error(err.message);
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
        toast.success(<div>Password reset successfully.<br />You can now sign in with your new password</div>);
        history.push("/signin");
      },
      error: (err) => {
        console.error("confirmForgotPassword error:", err);
        toast.error(err.message);
        setError({ password: err.message}); // TODO: check whom to blame for error
      }
    });
  };
  
  const formResendResetPasswordCode = (e) => {
    e.preventDefault();
    setError({});

    resendResetPasswordCode(email, {
      success: (data) => {
        console.log('resendResetPasswordCode success data:', data);
        toast.info("Code resent successfully");
      },
      error: (err) => {
        console.log('resendResetPasswordCode error:', err);
        switch (err.code) {
          case "ExpiredCodeException":
            setError({ confirmationCode: err }); // blame confirmationCode field as guilty
            break;
          default:
            setError({}); // we don't know whom to blame
        }
        toast.error(err.message);
      },
    });
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
                  <LockOpenOutlined />
                </Avatar>
              </Grid>

              <Box m={3} />

              <Grid container justifyContent="flex-start">
                <FormText>
                  {"Reset password"}
                </FormText>
              </Grid>

              <Box m={1} />

              <FormInput
                id={"email"}
                value={email}
                onChange={setEmail}
                placeholder={"Email"}
                startAdornmentIcon={<LockOpen />}
                error={error.email}
              />

              <Box m={1} />

              <FormButton
                onClick={formForgotPassword}
              >
                {"Request password reset"}
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
                placeholder={"New password"}
                startAdornmentIcon={<Lock />}
                error={error.password}
              />

              <FormInput
                id={"passwordConfirmed"}
                type="password"
                value={passwordConfirmed}
                onChange={setPasswordConfirmed}
                placeholder={"New password confirmation"}
                startAdornmentIcon={<Lock />}
                error={error.passwordConfirmed}
              />

              <FormInput
                id={"confirmationCode"}
                type="text" // number
                value={code}
                onChange={setCode}
                placeholder={"Numeric code just received by " + codeDeliveryMedium}
                startAdornmentIcon={<ConfirmationNumber />}
                error={error.confirmationCode}
              />

              <Box m={1} />

              <FormButton
                onClick={formConfirmForgotPassword}
              >
                Confirm Password Reset
              </FormButton>

              <Grid container justjustifyContentify="flex-end">
                <FormButton
                  onClick={formResendResetPasswordCode}
                  fullWidth={false}
                  className={"buttonSecondary"}
                >
                  Resend code
                </FormButton>
              </Grid>

            </>
          )}
        </fieldset>
      </form>

    </Container>
  );
}
