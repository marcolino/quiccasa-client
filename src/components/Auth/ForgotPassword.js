import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Auth } from "aws-amplify";
import { makeStyles } from "@material-ui/core/styles";
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
import { StatusContext } from "../../providers/StatusProvider";
//import { shadeColor } from "../../libs/Styling";
import { validateEmail, checkPassword } from "../../libs/Validation";

const styles = theme => ({
  avatar: {
    backgroundColor: theme.palette.success.main,
  },
});
const useStyles = makeStyles((theme) => (styles(theme)));

export default function ForgotPassword() {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmed, setPasswordConfirmed] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [error, setError] = useState({ email: null, password: null, passwordConfirmed: null, code: null });
  const [waitingForCode, setWaitingForCode] = useState(false);
  const [codeDeliveryMedium, setCodeDeliveryMedium] = useState("");
  const [code, setCode] = useState("");
  const history = useHistory();
  const { setStatus } = useContext(StatusContext);

  useEffect(() => {
    setStatus({showFooter: false});
  }, [setStatus]);

  const validateForm = () => { // validate email formally
console.log('VALIDATEFORM!');
    if (!waitingForCode) {
      if (!validateEmail(email)) {
        const err = "Please supply a valid email";
        setError({ ...error, email: err });
        toast.error(err);
        return false;
      }
    }

    if (waitingForCode) {
      if (!checkPassword(password)) {
        const err = "Please supply a more complex password";
        setError({ ...error, password: err });
        toast.error(err);
        return false;
      }

      if (password !== passwordConfirmed) {
        const err = "The confirmed password does not match the password";
        setError({ ...error, passwordConfirmed: err });
        toast.error(err);
        return false;
      }
    }

    return true;
  }

  const forgotPassword = (e) => {
    e.preventDefault();
    if (disabled) return;
    if (!validateForm()) return;

    setDisabled(true);
    setError({ email: null, password: null, passwordConfirmed: null, code: null });

    Auth.forgotPassword(email)
      .then((data) => {
        console.log(data);
        setWaitingForCode(true);
        setPassword("");
        switch (data.CodeDeliveryDetails.DeliveryMedium) {
          default: // in future we could treat EMAIL/SMS/... separately...
            const medium = data.CodeDeliveryDetails.AttributeName;
            const email = data.CodeDeliveryDetails.Destination;
            setCodeDeliveryMedium(medium);
            setDisabled(false); // TODO: always re-enable in case of error!
            toast.info(<div>Verification code sent via {medium} to {email}.<br />Please open it and copy and paste it here.</div>);
        }
      })
      .catch((err) => {
console.error('forgotPassword error:', err);
        setDisabled(false); // TODO: always re-enable in case of error!
        toast.error(err.message);
      });
  };
  
  const confirmForgotPassword = (e) => {
    e.preventDefault();
    setDisabled(true);
    
    Auth.forgotPasswordSubmit(email, code, password)
      .then(() => {
        setWaitingForCode(false);
        setEmail("");
        setPassword("");
        setPasswordConfirmed("");
        setCode("");
        toast.success("Password reset successfully. You can now sign in with your new password");
        history.push("/signin");
      })
      .catch((err) => {
console.error('confirmForgotPassword error:', err);
        setDisabled(false);
        toast.error(err.message);
      })
    ;
  };
  
  const resendCode = () => {
    setDisabled(true);

    Auth.resendResetPassword(email)
      .then(() => {
        toast.info("Code resent successfully");
      })
      .catch((err) => {
console.log('resendCode error:', err);
        setDisabled(false);
        toast.error(err.message);
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
                <LockOpenOutlined />
              </Avatar>
            </Grid>

            <Box m={3} />

            <Grid container justify="flex-start">
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
              disabled={disabled}
              error={error.email}
            />

            <Box m={1} />

            <FormButton
              onClick={forgotPassword}
              disabled={disabled}
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
              disabled={disabled}
              error={error.password}
            />

            <FormInput
              id={"passwordConfirmed"}
              type="password"
              value={passwordConfirmed}
              onChange={setPasswordConfirmed}
              placeholder={"New password confirmation"}
              startAdornmentIcon={<Lock />}
              disabled={disabled}
              error={error.passwordConfirmed}
            />

            <FormInput
              id={"confirmationCode"}
              type="text" // number
              value={code}
              onChange={setCode}
              placeholder={"Numeric code just received by " + codeDeliveryMedium}
              startAdornmentIcon={<ConfirmationNumber />}
              disabled={disabled}
              error={error.password}
            />

            <Box m={1} />

            <FormButton
              onClick={confirmForgotPassword}
            >
              Confirm Password Reset
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
