import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import Gravatar from "react-gravatar";

export default function IconGravatar(props) {
  const styles = theme => ({
    customAvatarIcon: {
    },
  });
  const useStyles = makeStyles((theme) => (styles(theme)));
  const classes = useStyles();

  return (
    <Gravatar
      email={props.email}
      size={props.size}
      style={props.style}
      className={props.className ? props.className : classes.customAvatarIcon}
    />
  );    
};

IconGravatar.propTypes = {
  email: PropTypes.string.isRequired,
  size: PropTypes.number,
  style: PropTypes.object,
  className: PropTypes.string,
};

IconGravatar.defaultProps = {
  size: 32,
};

