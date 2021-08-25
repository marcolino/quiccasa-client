import React, { Fragment, useState, useEffect/*, useContext*/ } from "react";
import { makeStyles } from "@material-ui/styles";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { usePromiseTracker } from "react-promise-tracker";
import { trackPromise } from "react-promise-tracker";
import { useTranslation } from "react-i18next";
import ImageCustom from "../ImageCustom";
import { getCurrentLanguage } from "../../libs/I18n";
import { findValueInObjectsArrayByProp } from "../../libs/Misc";
import { toast } from "../Toasts";
import config from "../../config";

const useStyles = makeStyles(theme => ({
  fieldset: {
    border: 0,
  },
  root: {
  },
  item: {
    display: "block",
  },
  enabledItem: {
  },
  disabledItem: {
    opacity: 0.3,
    backgroundColor: "#ddd",
  },
  avatar: {
  },
}));

export default function Profile() {
	const classes = useStyles();
  const { t } = useTranslation();
  const { promiseInProgress } = usePromiseTracker({delay: config.spinner.delay});
  const [users, setUsers] = useState([]);
  const { i18n } = useTranslation();

  const language = getCurrentLanguage(i18n);

  useEffect(() => {
    const apiStage = "dev"; // TODO: in env? ...
    const apiVersion = 1; // TODO: in config
    const email = "*"; //marcosolari@gmail.com"; // TODO: ...

    /* eslint-disable no-useless-concat */
    trackPromise(
      // TODO: utils function to get fetch basepath...
      fetch(`https://api${apiStage}.sistemisolari.com/v${apiVersion}/getUsersList` + `?` + new URLSearchParams({
        email: email,
      })) // TODO: url from config, or - better - encapsulate in lambda service...
      .then(response => response.json())
      .then(response => {
        console.log("response:", response)
        if (!response.data.error) {
          setUsers(response.data);
        } else {
          toast.warning(response.data.error);
        }
      })
      .catch(err => {
        console.log("error:", err);
        toast.error(t(err.message));
      })
    );
  // we do not add t dependency to avoid double execution
  // eslint-disable-next-line
  }, []);

  return (
    <>
      <fieldset disabled={promiseInProgress} className={classes.fieldset}>
        <List className={classes.root}>
          {users.map((user, index) => {
            const surname = findValueInObjectsArrayByProp(user.Attributes, "Name", "Value", "family_name");
            const name = findValueInObjectsArrayByProp(user.Attributes, "Name", "Value", "name");
            const givenName = findValueInObjectsArrayByProp(user.Attributes, "Name", "Value", "given_name");
            const email = findValueInObjectsArrayByProp(user.Attributes, "Name", "Value", "email");
            const emailVerified = findValueInObjectsArrayByProp(user.Attributes, "Name", "Value", "email_verified");
            const avatar = findValueInObjectsArrayByProp(user.Attributes, "Name", "Value", "picture");
            const dateOptions = { /*weekday: "long"*/ year: "numeric", month: "long", day: "numeric" };
            const userCreatedDate = new Date(user.UserCreateDate).toLocaleDateString(language, dateOptions);
            const userLastModifiedDate = new Date(user.UserLastModifiedDate).toLocaleDateString(language, dateOptions);

            return (
              <div key={index}>
                <ListItem className={classes[user.Enabled ? "enabledItem" : "disabledItem"]}>
                  <ListItemAvatar>
                    <Avatar className={classes.avatar}>
                      {avatar ?
                        <ImageCustom src={avatar} alt="user's icon" width={32} style={{borderRadius: "50%"}} />
                      :
                        <AccountCircleIcon />
                      }
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={user.Username}
                  />
                </ListItem>
                <div style={{marginTop: -15, marginLeft: "20%"}}>
                  <div>
                    {`${t("Name")}: ${givenName ? givenName : name} ${surname ? surname : ""}`}
                  </div>
                  <div>
                    {`${t("Email")}: ${email}`}
                  </div>
                  <div>
                    {`${t("Email verified")}: ${emailVerified ? t("true") : t("false")}`}
                  </div>
                  <div>
                    {`${t("Creation date")}: ${userCreatedDate}`}
                  </div>
                  <div>
                    {`${t("Last modification date")}: ${userLastModifiedDate}`}
                  </div>
                  <div>
                    {`${t("Enabled")}: ${user.Enabled ? t("true") : t("false")}`}
                  </div>
                </div>
                <Divider /*variant="inset"*/ component="li" style={{margin: 10}} />
              </div>
            );
          })}
        </List>
      </fieldset>
    </>

  );
}
