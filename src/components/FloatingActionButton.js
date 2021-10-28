import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { StatusContext } from "../providers/StatusProvider";
import { useTranslation } from "react-i18next";
import { Container, Button, lightColors, darkColors } from "react-floating-action-button";
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';

export default function FloatingActionButton(props) {
  const [show, setShow] = useState(false);
  const { status } = useContext(StatusContext);
  const history = useHistory();
  const { t } = useTranslation();

  const link = props.link ? props.link : {
    pathname: "/notifications",
    //search: "?query=abc",
    state: status.pushNotification,
  };

  useEffect(() => {
    setShow(status.pushNotification != null);
  }, [setShow, status.pushNotification]);

  return show ? (
    <Container>
      {/* TODO: use this internal buttons to show more little buttons on click of main button
      <Button
        tooltip="Create note link"
        onClick={() => {console.log('Create note link clicked'); setShow(false); }}
        styles={{backgroundColor: darkColors.green, color: lightColors.white}}
      ><NotificationsActiveIcon /></Button>
      <Button
        tooltip="Add user link"
        rotate={true}
        onClick={() => {console.log('Add user link clicked'); setShow(false); }}
        styles={{backgroundColor: darkColors.blue, color: lightColors.white}}
      ><NotificationsActiveIcon /></Button>
      */}
      <Button
        tooltip={t("You have some new notifications!")}
        rotate={true}
        onClick={() => {console.log('FloatingActionButton rocks!', history); setShow(false); history.push(link); }}
        styles={{backgroundColor: darkColors.lighterRed, color: lightColors.white}}
      ><NotificationsActiveIcon /><span style={{position: "relative", bottom: "-0.8em", fontSize: "90%", fontWeight: "bold"}}>{1/*status.pushNotification*/}</span></Button>
    </Container>
  ) : (
    <></>
  )
}