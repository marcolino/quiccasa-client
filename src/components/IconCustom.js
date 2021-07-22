import React from "react";
import PropTypes from "prop-types";
import IconLogoMain from "../assets/icons/LogoMain.png";
import IconLogoTest from "../assets/icons/LogoTest.png";

export default function IconCustom(props) {
  let icon = null;
  switch (props.name) {
    case "LogoMain": icon = IconLogoMain; break;
    case "LogoTest": icon = IconLogoTest; break;
    default: icon = "#"; break;
  }

  return (
    <img src={icon} style={props.style} width={props.size} height={props.size} alt={`${props.name}`} {...props} />
  );    
};

IconCustom.propTypes = {
  name: PropTypes.oneOf([
    "LogoMain",
    "LogoTest",
  ]).isRequired,
  size: PropTypes.number,
  style: PropTypes.object,
  alt: PropTypes.string,
};

IconCustom.defaultProps = {
  size: 32,
  style: {},
  alt: "icon",
};
