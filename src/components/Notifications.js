import React from "react";
import { makeStyles } from "@material-ui/styles";
import Avatar from "@material-ui/core/Avatar";
import ShareIcon from '@material-ui/icons/Share';
import IconButton from '@material-ui/core/IconButton';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import red from '@material-ui/core/colors/red';

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
      {props.location.state.map((state, index) => {
        const timestamp = state["data.google.c.a.ts"];
        const when = new Intl.DateTimeFormat(
          'it-IT'/* TODO */,
          {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            //second: '2-digit',
          }
        ).format(timestamp);
        return (
          <Card key={index} className={classes.root}>

            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: red }} aria-label="notification avatar">
                  F
                </Avatar>
              }
              action={
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              }
              title={state.notification.title}
              subheader={when}
            />

            <CardContent>
              <img src={state.notification.image} alt="test" style={{maxHeight: 300, maxWidth: 300}} />
            </CardContent>

            <CardContent>
              <Typography variant="body2" color="textSecondary" component="p">
                {state.notification.body}
              </Typography>
            </CardContent>

            <CardActions>
              <IconButton aria-label="share">
                <ShareIcon /> {/* TODO: handle share */}
              </IconButton>
              <IconButton aria-label="delete forever">
                <DeleteForeverIcon /> {/* TODO: handle delete forever */}
              </IconButton>
            </CardActions>

          </Card>
        )
      })}
    </div>
  );
}
