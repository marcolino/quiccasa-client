import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { signUp, resendSignUp, confirmSignUp } from "../AuthPromise";
import { usePromiseTracker } from "react-promise-tracker";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import AccountCircleOutlined from "@material-ui/icons/AccountCircleOutlined";
import ConfirmationNumber from "@material-ui/icons/ConfirmationNumber";
import Person from "@material-ui/icons/Person";
import Email from "@material-ui/icons/Email";
import Lock from "@material-ui/icons/Lock";
import { toast } from "../Toasts";
import { FormInput, FormButton, FormText } from "../FormElements";
import { validateEmail, checkPassword } from "../../libs/Validation";
import config from "../../config.json";

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
  const [codeDeliveryMedium, setCodeDeliveryMedium] = useState("");
  const [waitingForCode, setWaitingForCode] = useState(false);
  const [code, setCode] = useState("");
  const [error, setError] = useState({});
  const { promiseInProgress } = usePromiseTracker({delay: config.spinner.delay});

  const validateFormStep1 = () => {
    
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

    if (!passwordConfirmed) {
      const err = "Please confirm the password";
      setError({ passwordConfirmed: err });
      toast.error(err);
      return false;
    }

    if (password !== passwordConfirmed) {
      const err = "The confirmed password does not match the password";
      setError({ passwordConfirmed: err });
      toast.error(err);
      return false;
    }

    return true;
  };

  const validateFormStep2 = () => {
    if (code.length <= 0) {
      setError({ code: "Code is mandatory"});
      return false;
    }
    return true;
  };

  const formSignUp = (e) => {
    e.preventDefault();
    if (!validateFormStep1()) return;
    setError({});

    signUp({
      username: email,
      password,
      attributes: {
        email,
        name: firstName,
        family_name: lastName,
        /* IMPROVE: add custom fields
        phone_number: phoneNumber, // E.164 number convention: country code (1 to 3 digits) + subscriber number (max 12 digits)
        "custom:favorite_flavor": FavoriteFlavour, // custom attribute, not standard
        */
      }
    }, {
      success: (data) => {
        console.log('signUp success data:', data);
        const medium = data.codeDeliveryDetails.DeliveryMedium.toLowerCase();
        toast.info(`Confirmation code just sent by ${medium}`)
        setCodeDeliveryMedium(medium);
        setWaitingForCode(true);
        setPassword("");
      },
      error: (err) => {
        console.error('signup error data:', err);
        toast.error(err.message);
        switch (err.code) {
          case "UsernameExistsException":
            setError({ email: err.message }); // since we use email as username, we blame email field as guilty
            break;
          default:
            setError({}); // we don't know whom to blame
        }
      },
    });
  };

  const formConfirmSignUp = (e) => {
    e.preventDefault();
    if (!validateFormStep2()) return;
    setError({});

    confirmSignUp(email, code, {
      success: (data) => {
        console.log('confirmSignUp success data:', data);
        if (data === "SUCCESS") {
          toast.success(<div>Registered successfully.<br />You can now sign in with email and password.</div>);
        } else {
          console.error('confirmSignUp succes, not SUCCESS data:', data);
          toast.error(data);
        }
        setWaitingForCode(false);
        setEmail("");
        setCode("");
        history.push("/signin");
      },
      error: (err) => {
        console.error('confirmSignUp error data:', err);
        toast.error(err.message);
        setError({ code: err.message});
      },
    });
  };
  
  const formResendSignUpCode = (e) => {
    e.preventDefault();
    setError({});

    resendSignUp(email, {
      success: (data) => {
        toast.info(`Code resent successfully by ${codeDeliveryMedium}`);
      },
      error: (err) => {
        console.error('resendSignUp error data:', err)
        toast.error(err.message);
        setError({ code: err.message});
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
                error={error.firstName}
              />

              <FormInput
                id={"lastName"}
                value={lastName}
                onChange={setLastName}
                placeholder={"Last Name"}
                startAdornmentIcon={<Person />}
                error={error.lastName}
              />

              <FormInput
                id={"email"}
                value={email}
                onChange={setEmail}
                placeholder={"Email"}
                startAdornmentIcon={<Email />}
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

              <FormInput
                id={"passwordConfirmed"}
                type="password"
                value={passwordConfirmed}
                onChange={setPasswordConfirmed}
                placeholder={"Password confirmation"}
                startAdornmentIcon={<Lock />}
                error={error.passwordConfirmed}
              />

              <Box m={1} />

              <FormButton
                onClick={formSignUp}
              >
                {"Sign Up"}
              </FormButton>

            </>
          )}
          {waitingForCode && (
            <>
              <FormInput
                id={"signUpCode"}
                type="number"
                value={code}
                onChange={setCode}
                placeholder={`Numeric code just received by ${codeDeliveryMedium}`}
                startAdornmentIcon={<ConfirmationNumber />}
                error={error.code}
              />

              <FormButton
                onClick={formConfirmSignUp}
              >
                Confirm Sign Up
              </FormButton>

              <Grid container justify="flex-end">
                <FormButton
                  onClick={formResendSignUpCode}
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