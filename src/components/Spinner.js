import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { usePromiseTracker } from "react-promise-tracker";
import Loader from "react-loader-spinner";

export const Spinner = (props) => {

  const spinnerDelay = 150; // milliseconds delay before showing spinner
  const spinnerType = "ThreeDots";
  const spinnerColor = "green";

  const { promiseInProgress } = usePromiseTracker({delay: spinnerDelay});

  // centered overlay styles
  const styles = theme => ({
    outer: {
      display: "table",
      position: "absolute",
      top: 0,
      left: 0,
      height: "100%",
      width: "100%",
      opacity: 0.5,
    },
    middle: {
      display: "table-cell",
      verticalAlign: "middle",
    },
    inner: {
      marginLeft: "auto",
      marginRight: "auto",
      height: 100,
      width: 100,
    },
  });
  const useStyles = makeStyles((theme) => (styles(theme)));
  const classes = useStyles();

  return promiseInProgress && (
    <div className={classes.outer}>
      <div className={classes.middle}>
        <div className={classes.inner}>
          <Loader type={spinnerType} color={spinnerColor} />
        </div>
      </div>
    </div>
  );
};
