import React from "react";
import { makeStyles } from "@material-ui/styles";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import i18n from "i18next";
import IconCustom from "./IconCustom";
import { isAuthLocation } from "../libs/Misc";
import config from "../config";
import packageJson from "../package.alias.json";

const useStyles = makeStyles(theme => ({
	footer: {
    fontStyle: "italic",
	},
}));

const changeLanguage = () => {
  const language = i18n.language === "it" ? "en" : "it"; // simple switch it<=> en - TODO: let user select language...
  i18n.changeLanguage(language);
  document.documentElement.setAttribute("lang", language);
}

function Footer(props) {
  const location = useLocation();
	const classes = useStyles();
  const { t } = useTranslation();
  const on = t("on"), off = t("off");
  const languageIcon = config.languages.supported[navigator.language.slice(0, 2).toLowerCase()].icon; // TODO: do something safer...

  return isAuthLocation(location) ? null : ( // hide footer while in auth screens
    <Container className={classes.footer}>
      <Grid container justifyContent="center">
        <Typography component="h6" variant="body2" color={"textSecondary"}>
          {packageJson.name} {" "}
          {"v"}{packageJson.version} {" ~ "}
          {"©"} {" "} {new Date().getFullYear()}, {" "}
          <Link color="inherit" href={config.companyHomeSiteUrl}>
            {config.companyName}
          </Link>
          <span>&emsp;</span>
          <span onClick={() => changeLanguage()}>{languageIcon}</span>
          <span>&emsp;</span>
          <IconCustom name={`Network.${props.isOnline ? "on" : "off"}`} fill="red" size={12} alt={t("Network connection indicator")} title={t("Network connection is {{how}}", { how: props.isOnline ? on : off })} />
        </Typography>
      </Grid>
    </Container>
  );
}

export default React.memo(Footer);
