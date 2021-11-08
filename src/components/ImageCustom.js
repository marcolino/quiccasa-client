import React from "react";
import PropTypes from "prop-types";



function ImageCustom(props) {
  return (
    <img src={props.src} style={props.style} width={props.size} height={props.size} alt={props.alt} {...props} />
  );    
};

ImageCustom.propTypes = {
  src: PropTypes.string.isRequired,
  size: PropTypes.number,
  style: PropTypes.object,
  alt: PropTypes.string,
};

ImageCustom.defaultProps = {
  size: 32,
  style: {},
  alt: "icon",
};

export default React.memo(ImageCustom);