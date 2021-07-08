import React, { useContext } from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import { StatusContext } from "../providers/StatusProvider";
import config from "../config.json";

const styles = theme => ({
	footer: {
    fontStyle: 'italic',
	},
});

export default function Footer() {
  const { status } = useContext(StatusContext);

  return status.showFooter ? (
    <Container style={styles().footer}>
      <Grid container justify="center">
        <Copyright color={"textSecondary"} />
      </Grid>
    </Container>
  ) : (<div></div>);
}

const Copyright = (props) => {
  return (
    <Typography variant="body2" color={props.color}>
      {'Copyright © '} {new Date().getFullYear()}, {' '}
      <Link color="inherit" href={config.COMPANY_HOME_SITE_URL}>
        {config.COMPANY_NAME}
      </Link>{' '}
    </Typography>
  );
}
