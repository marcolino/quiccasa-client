import React from "react";
import { makeStyles } from "@material-ui/styles";
import { usePromiseTracker } from "react-promise-tracker";
import Loader from "react-loader-spinner";
import config from "../config";



function Spinner(props) {
  const { promiseInProgress } = usePromiseTracker({delay: config.spinner.delay});

  // centered overlay styles
  const styles = theme => ({
    outer: {
      display: "table",
      position: "absolute",
      top: 0,
      left: 0,
      height: "100%",
      width: "100%",
      opacity: config.spinner.opacity,
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
          <Loader type={config.spinner.type} color={config.spinner.color} height={config.spinner.size} />
        </div>
      </div>
    </div>
  );
};

export default React.memo(Spinner);