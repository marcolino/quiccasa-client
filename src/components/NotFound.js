import React from "react";
import { makeStyles } from "@material-ui/styles";
import Link from "@material-ui/core/Link";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles(theme => ({
	notFound: {
	},
}));



function NotFound() {
	const classes = useStyles();
  const { t } = useTranslation();

  return (
    <div className={classes.notFound}>
      <h2>{t("Page not found, sorry.")}</h2>
    
      <Link href="/" variant="body2" className={classes.notFound}>
        <h3>{t("Go back to home page")}</h3>
      </Link>
    </div>
  );
}


export default React.memo(NotFound);