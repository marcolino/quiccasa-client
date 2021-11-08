import React from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import privacyPolicy_en from "./en/PrivacyPolicy";
import privacyPolicy_it from "./it/PrivacyPolicy";
import termsOfUse_en from "./en/TermsOfUse";
import termsOfUse_it from "./it/TermsOfUse";
import config from "../../config";

function Legal(props) {
 	const contents = (
    props.doc === "privacyPolicy" ? (
      (props.language === "en") ?
        privacyPolicy_en() :
      (props.language === "it") ?
        privacyPolicy_it() :
      "unsupported language property"
    ) :
    props.doc === "termsOfUse" ? (
      (props.language === "en") ?
        termsOfUse_en() :
      (props.language === "it") ?
        termsOfUse_it() :
      "unsupported language property"
    ) :
    "unsupported doc property"
  );

  const history = useHistory();
  const backButtonStyle = {alignSelf: "flex-start", border: "1px solid #aaa", borderRadius: 7, padding: "8px 16px", backgroundColor: "#eee", color: "#000", cursor: "pointer"};
  const backButtonArrow = "◄";
  const backButton = <input type="button" onClick={() => history.goBack()} value={backButtonArrow} style={backButtonStyle} />;
  
  return (
    <>
      {backButton}
      {contents}
    </>
  );

}

Legal.propTypes = {
  language: PropTypes.string,
  doc: PropTypes.oneOf([ "privacyPolicy", "termsOfUse" ]),
};

Legal.defaultProps = {
  language: config.languages.fallback,
  doc: "",
};

export default React.memo(Legal);
