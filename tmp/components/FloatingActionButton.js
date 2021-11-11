import React, { /*useState, useEffect, */useContext } from "react";
import { useLocation } from "react-router";
import { useHistory } from "react-router-dom";
//import { useTranslation } from "react-i18next";
import { Container, Button, lightColors, darkColors } from "react-floating-action-button";
import NotificationsActiveIcon from "@material-ui/icons/NotificationsActive";
import useSound from "use-sound";
//import UIfx from "uifx";
import kissSound from "../assets/sounds/pop.mp3";
import { StatusContext } from "../providers/StatusProvider";



function FloatingActionButton(props) {
console.log("FloatingActionButton props:", props);
  const { status } = useContext(StatusContext);
  const location = useLocation();
console.log("FloatingActionButton - location:", location);
  const history = useHistory();
  //const { t } = useTranslation();
  const [play] = useSound(kissSound); 

  const showingNotifications = (location.pathname === "/notifications");
  const show = true || (status.pushNotifications.length && !showingNotifications);

  const link = props.link ? props.link : {
    pathname: "/notifications",
    //search: "?query=abc",
    state: status.pushNotifications,
  };

  const action = () => {
    console.log('FloatingActionButton rocks!', history);
    history.push(link);
    play();
  };

  return show ? (
    <Container>
      {/* TODO: use this internal buttons to show more little buttons on click of main button
      <Button
        tooltip="Create note link"
        onClick={() => {console.log('Create note link clicked'); /*setShow(false);* / }}
        styles={{backgroundColor: darkColors.green, color: lightColors.white}}
      ><NotificationsActiveIcon /></Button>
      <Button
        tooltip="Add user link"
        rotate={true}
        onClick={() => {console.log('Add user link clicked'); /*setShow(false);* / }}
        styles={{backgroundColor: darkColors.blue, color: lightColors.white}}
      ><NotificationsActiveIcon /></Button>
      */}
      <Button
        //tooltip={t("You have some new notifications!")}
        rotate={true}
        onClick={action}
        styles={{backgroundColor: darkColors.lighterRed, color: lightColors.white}}
      >
        <NotificationsActiveIcon />
        <span style={{position: "relative", bottom: "-0.8em", fontSize: "90%", fontWeight: "bold"}}>
          {status.pushNotifications.length > 1 ? status.pushNotifications.length : null}
        </span>
      </Button>
    </Container>
  ) : null
}

export default React.memo(FloatingActionButton);
