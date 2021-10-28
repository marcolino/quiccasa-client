import React/*, { useContext }*/ from "react";
import { makeStyles } from "@material-ui/styles";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
//import { useTranslation } from "react-i18next";

const useStyles = makeStyles(theme => ({
  root: {
    "& > *": {
      margin: theme.spacing(1)
    }
  },
	notifications: {
    maxWidth: 300,
    fontSize: "1.5em",
	},
  media: {
    maxHeight: 300,
  },
}));

export default function Notifications(props) {
	const classes = useStyles();
  //const { t } = useTranslation();
console.log("props:", props);

  // TODO: check props.location.state is not undefined!

  return (
    <div className={classes.root}>

      {/* <div className={classes.notifications}>
        <div>props: {JSON.stringify(props)}</div>
      </div> */}
<img src={props.location.state.notification.image} alt="test" style={{maxHeight: 300, maxWidth: 300}} />
      <Card className={classes.root}>
        <CardMedia
          className={classes.media}
          image={props.location.state.notification.image}
          title={props.location.state.notification.title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.location.state.notification.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.location.state.notification.body}
          </Typography>
        </CardContent>

        <CardActions>
          <Button size="small" color="primary">
            Share
          </Button>
          <Button size="small" color="primary">
            Mark as read
          </Button>
        </CardActions>

      </Card>

    </div>
  );
}



/*
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

import waveImg from "./wave.png";

const useStyles = makeStyles({
  root: {
    maxWidth: 345
  },
  media: {
    height: "100px"
  }
});

export default function ImgMediaCard() {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.media}
        image={waveImg}
        title="Paella dish"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          CardMedia Example
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          The CardMedia component sets a background image to cover available
          space.
        </Typography>
      </CardContent>
    </Card>
  );
}
*/