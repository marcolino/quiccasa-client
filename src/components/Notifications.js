import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
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
import { StatusContext } from "../providers/StatusProvider";

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
  const { status, setStatus } = useContext(StatusContext);
  const history = useHistory();
	const classes = useStyles();
  //const { t } = useTranslation();

  const deleteForeverMessage = (index) => {
    //setStatus({pushNotifications: []}); // TODO: delete only THIS message!
    setStatus({pushNotifications: status.pushNotifications.filter((notification, i) =>
      i !== index
    )});
console.log("Notifications - (!status.pushNotifications.length):", (!status.pushNotifications.length));
    if (status.pushNotifications.length <= 1) { // setStatus is asynchronous...
      history.goBack();
    }
  };
  
console.log("Notifications - status.pushNotifications:", status.pushNotifications);
console.log("Notifications - props.location.state:", props.location.state);

//{props.location.state && props.location.state.map((state, index) => {

return (
    <div className={classes.root}>
      {status.pushNotifications.map((state, index) => {
console.log("Notifications state:", state);
        const timestamp = state.data["google.c.a.ts"];
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
        ).format(timestamp * 1000); // milliseconds required
        return (
          <Card key={index} className={classes.root}>

            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: red }} src={state.notification.image} aria-label="notification avatar" />
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
              <IconButton aria-label="delete forever" onClick={() => deleteForeverMessage(index)} >
                <DeleteForeverIcon /> {/* TODO: handle delete forever */}
              </IconButton>
            </CardActions>

          </Card>
        )
      })}
    </div>
  );
}
