import React, { useState, useEffect/*, useContext*/ } from "react";
import { makeStyles } from "@material-ui/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
//import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { useTranslation } from "react-i18next";
//import axios from "axios";
import { getUsers } from "../libs/Fetch";
import moment from "moment";
import "moment/locale/it"; // TODO: import all needed locales... (!!!)
import { toast } from "./Toast";
//import { AuthContext } from "../providers/AuthProvider";

const useStyles = makeStyles(theme => ({
	adminPanel: {
    fontSize: "1.5em",
	},
}));



function AdminPanel() {
	const classes = useStyles();
  //const { auth } = useContext(AuthContext);
  const { t } = useTranslation();

  const [data/*, setData*/] = useState({});

  moment.locale("it");

  useEffect(() => {
    (async () => {
      await getUsers({}).then(data => {
        if (!data.ok) {
          console.warn("getUsers error:", data);
          toast.error(t(data.message));
          return;
        }
        console.log("getUsers success:", data);
      }).catch(err => {
        console.error("getUsers error catched:", err);
        toast.error(t(err.message));
      });
    })();

//     try {
//       const config = {
//         headers: { Authorization: `Bearer ${auth.user.accessToken}` }
//       };
// console.log('auth.user.accessToken:', auth.user.accessToken);
//       const result = await axios.get(
//         "/api/user/",
//         config
//         );
//       //const res = await result.json();
// console.log("result:", result);
//       setData(result.data);
//     } catch(err) {
//       console.log("Fetch error:", err); // TODO...
//       toast.error(t(err.message));
//     }
  }, [t]);

  return (
    <div className={classes.adminPanel}>
      {`${t("Admin Panel")}`}
      <div>
        <label>{t("Users:")}</label>
        <Grid
          container
          spacing={2}
          direction="row"
          justify="flex-start"
          alignItems="flex-start"
        >
          {
            data.users ? data.users.map(user => (
              <Grid item xs={12} key={user._id}>
                <Card>
                  <CardContent style={{ fontSize: "0.9em" }}>
                    <Typography color="text.primary">
                      {`${user.firstName} ${user.lastName}`}
                    </Typography>
                    <Typography color="text.secondary">
                      {user.email}
                    </Typography>
                    <Typography color="text.secondary">
                      {t("Roles") + ":"} {user.roles.length ? user.roles.join(", ") : "user"}{/* "user" is default role */}
                    </Typography>
                    <Typography color="text.secondary">
                      {t("Verified") + ":"} {user.isVerified ? t("yes") : t("no")}
                    </Typography>
                    <Typography color="text.secondary">
                      {/* TODO: localize according current language... possibly in a much more outer level */}
                      {t("Created on") + ":"} {moment(user.createdAt).locale("it").format("YYYY-MM-DD")}
                    </Typography>
                    <Typography color="text.secondary">
                      {t("Updated on") + ":"} {moment(user.updatedAt).locale("it").format("YYYY-MM-DD")}
                    </Typography>
                    <Typography color="text.secondary">
                      {t("Access token") + ":"} {user.accessToken}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            )) : "..."
          }
        </Grid>
      </div>
    </div>
  );
}

export default React.memo(AdminPanel);