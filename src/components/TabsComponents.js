import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";

const height = window.innerHeight;
const width = window.innerWidth;
const heightScrollable = (
  (height >= width) ?
    //height - (height *.12) - (height *.12) - (height *.12) // portrait
    height * .64 // portrait
  :
    //height - (height *.16) - (height *.16) - (height*.16) // landscape
    height * .52 // landscape
  );

//console.log("height, width, heightScrollable:", height, width, heightScrollable);
const useStyles = makeStyles(theme => ({
	paragraph: {
    fontSize: "1.1em",
	},
	paragraphSmall: {
    fontSize: "0.8em",
	},
  centered: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  justified: {
    textAlign: "justify",
  },
  box: {
    display: "flex",
  },
  boxRight: {
    justifyContent: "flex-end",
  },
  sup: {
    fontSize: "0.8em",
  },
  scrollableContainer: {
    display: "flex",
    flexDirection: "column",
    marginTop: "1em",
    height: heightScrollable,
  },
  scrollable: {
    height: "100%",
    overflowY: "auto",
    paddingLeft: 10,
    paddingRight: 10,
  },
}));

const TabContainer = React.memo(props => {
  //const classes = useStyles();
  return (
    <div>
      {props.children}
    </div>
  );
});
TabContainer.propTypes = {
};
TabContainer.defaultProps = {
};

const TabBodyScrollable = React.memo(props => {
  const classes = useStyles();
  return (
    <div className={classes.scrollableContainer}>
      <div className={classes.scrollable}>
        {props.children}
      </div>
    </div>
  );
});
TabBodyScrollable.propTypes = {
};
TabBodyScrollable.defaultProps = {
};

const TabTitle = React.memo(props => {
  const classes = useStyles();
  return (
    <div className={classes.centered}>
      <h2>{props.children}</h2>
    </div>
  );
});
TabTitle.propTypes = {
};
TabTitle.defaultProps = {
};

const TabParagraph = React.memo(props => {
  const classes = useStyles();
  return (
    <Box mb={1}>
      <Typography component="div" className={`${classes.paragraph} ${classes.justified} ${props.small ? classes.paragraphSmall : null} ${props.class}`}>
        {props.children}
      </Typography>
    </Box>
  );
});
TabParagraph.propTypes = {
  class: PropTypes.string,
};
TabParagraph.defaultProps = {
  class: null,
};

const TabNextButton = React.memo(props => {
  const classes = useStyles();
  return (
    <Box
      component="span"
      m={1} // margin
      className={`${classes.box} ${classes.boxRight}`}
    >
      <Button
        variant="contained"
        color="secondary"
        // fullWidth={props.fullWidth}
        // variant={props.variant}
        // color={props.color}
        // size={props.size}
        // className={`${classes.button} ${props.social ? classes.buttonFederated : ""} ${props.social ? classes["buttonFederated" + capitalize(props.social)] : ""} ${classes[props.className]}`}
        // startIcon={props.startIcon}
        onClick={props.onNext}
        disabled={!props.nextIsEnabled}
      >
        {props.children}
      </Button>
    </Box>
  );
});
TabNextButton.propTypes = {
  onNext: PropTypes.func.isRequired,
  nextIsEnabled: PropTypes.bool.isRequired,
};
TabNextButton.defaultProps = {
};

const TabTooltip = React.memo(props => {
  const classes = useStyles();
  return (
    <Tooltip
      title={props.title}
      placement="top"
    >
      <sup className={classes.sup}>{props.anchor}</sup>
    </Tooltip>
  );
});
TabTooltip.propTypes = {
  title: PropTypes.string.isRequired,
  anchor: PropTypes.string,
};
TabTooltip.defaultProps = {
  anchor: "*",
};

export {TabContainer, TabBodyScrollable, TabTitle, TabParagraph, TabNextButton, TabTooltip};