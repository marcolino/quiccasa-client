
import React, { useContext } from "react";
import { makeStyles } from "@material-ui/styles";
import { usePromiseTracker } from "react-promise-tracker";
import { trackPromise } from "react-promise-tracker";
import { useTranslation } from "react-i18next";
import Container from "@material-ui/core/Container";
import { AuthContext } from "../providers/AuthProvider";
import { toast } from "./Toast";
import { FormButton } from "./FormElements";
import config from "../config";
import { ETBTAdd } from "../libs/I18n"; // TODO: remove me when finished collecting serve errors

const useStyles = makeStyles(theme => ({
  fieldset: {
    border: 0,
  },
}));

export default function Unsubscribe() {
	const classes = useStyles();
  const { auth } = useContext(AuthContext);
  const { t } = useTranslation();
  const { promiseInProgress } = usePromiseTracker({delay: config.spinner.delay});

  const formUnsubscribe = (e) => {
    // TODO: to config...
    const apiStage = "dev"; 
    const apiVersion = 1;
    
    /* eslint-disable no-useless-concat */
    trackPromise(
      // TODO: utils function to get fetch basepath...
      fetch(`https://api${apiStage}.sistemisolari.com/v${apiVersion}/unsubscribe` + `?` + new URLSearchParams({
        username: auth.user.username,
      })) // TODO: url from config, or - better - encapsulate in lambda service...
      .then(response => response.json())
      .then(data => {
        console.log("data:", data)
        if (!data.error) {
          toast.success(data.message);
        } else {
ETBTAdd("unsubscribeWarning", data.error);
          toast.warning(data.error);
        }
      })
      .catch(err => { // TODO ...
console.log("error:", err);
ETBTAdd("unsubscribeError", err.message);
        toast.error(t(err.message));
      })
    );
  }

  return (
    <Container maxWidth="xs">

      <form className={classes.form} noValidate autoComplete="off">
        <fieldset disabled={promiseInProgress} className={classes.fieldset}>

          <FormButton
            onClick={formUnsubscribe}
          >
            {t("Unsubscribe")}
          </FormButton>
        </fieldset>
      </form>

    </Container>
  );
}
