import React from "react";
import { makeStyles } from "@material-ui/styles";
import { useLocation } from "react-router-dom";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import IconCustom from "./IconCustom";
import { isAuthLocation } from "../libs/Misc";
import config from "../config.json";
import packageJson from "../package.alias.json";

const useStyles = makeStyles(theme => ({
	footer: {
    fontStyle: "italic",
	},
}));

export default function Footer(props) {
  const location = useLocation();
	const classes = useStyles();

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
          <IconCustom name={`Network.${props.isOnline ? "on" : "off"}`} fill="red" size={12} alt="Network connection indicator" title={`Network connection is ${props.isOnline ? "on" : "off"}`} />
        </Typography>
      </Grid>
    </Container>
  );
}