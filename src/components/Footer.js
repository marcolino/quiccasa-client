import React from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import config from "../config.json";
import packageJson from "../package.alias.json";

const styles = theme => ({
	footer: {
    fontStyle: 'italic',
	},
});

export default function Footer() {

  return (
    <Container style={styles().footer}>
      <Grid container justify="center">
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
      <Link color="inherit" href={config.COMPANY_HOME_SITE_URL}>
        {config.COMPANY_NAME}
      </Link>{' '}
    </Typography>
  );
}
