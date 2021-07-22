import React from "react";
import { useLocation } from "react-router-dom";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import { isAuthLocation } from "../libs/Misc";
import config from "../config.json";
import packageJson from "../package.alias.json";

// TODO: use makeStyles() ...
const styles = theme => ({
	footer: {
    fontStyle: 'italic',
	},
});

export default function Footer() {
  const location = useLocation();

  return isAuthLocation(location) ? null : ( // hide footer while in auth screens
    <Container style={styles().footer}>
      <Grid container justifyContent="center">
        <Copyright color={"textSecondary"} />
      </Grid>
    </Container>
  );
}

const Copyright = (props) => {
  return (
    <Typography component="h6" variant="body2" color={props.color}>
      {packageJson.name} {" "}
      {"v"}{packageJson.version} {" ~ "}
      {'©'} {' '} {new Date().getFullYear()}, {' '}
      <Link color="inherit" href={config.companyHomeSiteUrl}>
        {config.companyName}
      </Link>{' '}
    </Typography>
  );
}
