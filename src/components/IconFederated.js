import React from "react";
import { ReactComponent as FacebookSvg } from "../assets/icons/FederatedFacebook.svg";
import { ReactComponent as GoogleSvg } from "../assets/icons/FederatedGoogle.svg";

const style = {
  display: "flex",
  width: 20,
  height: 20,
  alignItems: "center",
  justifyContent: "center",
  marginLeft: 5,
  marginRight: 5,
};

const FacebookIcon = React.memo(() => (
  <div style={{...style, width: 26, marginLeft: 1}}>
    <FacebookSvg />
  </div>
));
const GoogleIcon = React.memo(() => (
  <div style={{...style, width: 20, marginLeft: 1, marginRight: 10}}>
    <GoogleSvg />
  </div>
));

export { FacebookIcon, GoogleIcon };