import React from "react";
import PropTypes from "prop-types";
import IconLogoMain from "../assets/icons/LogoMain.png";
import IconNetworkOn from "../assets/icons/Network.on.svg";
import IconNetworkOff from "../assets/icons/Network.off.svg";



function IconCustom(props) {
  let icon = null;
  switch (props.name) {
    case "LogoMain": icon = IconLogoMain; break;
    case "Network.on": icon = IconNetworkOn; break;
    case "Network.off": icon = IconNetworkOff; break;
    default: icon = "#"; break;
  }

  return (
    <img src={icon} style={props.style} width={props.size} height={props.size} alt={`${props.alt ? props.alt : props.name}`} {...props} />
  );    
};

IconCustom.propTypes = {
  name: PropTypes.oneOf([
    "LogoMain",
    "Network.on",
    "Network.off",
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


export default React.memo(IconCustom);