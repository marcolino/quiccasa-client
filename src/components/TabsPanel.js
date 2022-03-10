import React from "react";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import AppBar from '@material-ui/core/AppBar';
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Tab01Start from "./Tab01Start";
import Tab02Download from "./Tab02Download";
import Tab03FillData from "./Tab03FillData";
import Tab04Upload from "./Tab04Upload";



function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`nav-tab-${index}`}
      {...other}
    >
      <Box p={3}>
        {children}
      </Box>
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

const a11yProps = (index) => {
  return {
    id: `nav-tab-${index}`,
    "aria-controls": `nav-tabpanel-${index}`
  };
}

// const LinkTab = (props) => {
//   return (
//     <Tab
//       component="a"
//       onClick={(event) => {
//         event.preventDefault();
//       }}
//       {...props}
//     />
//   );
// };

// const AntTab = withStyles((theme) => ({
//   root: {
//     opacity: 0.3  ,
//     textTransform: 'none',
//     minWidth: 72,
//     fontWeight: theme.typography.fontWeightRegular,
//     marginRight: theme.spacing(4),
//     fontFamily: [
//       '-apple-system',
//       'BlinkMacSystemFont',
//       '"Segoe UI"',
//       'Roboto',
//       '"Helvetica Neue"',
//       'Arial',
//       'sans-serif',
//       '"Apple Color Emoji"',
//       '"Segoe UI Emoji"',
//       '"Segoe UI Symbol"',
//     ].join(','),
//     '&:hover': {
//       color: '#40a9ff',
//       opacity: 1,
//     },
//     '&$selected': {
//       color: '#1890ff',
//       fontWeight: theme.typography.fontWeightMedium,
//     },
//     '&:focus': {
//       color: '#40a9ff',
//     },
//   },
//   selected: {},
// }))((props) => <Tab {...props} />);

const StyledTab = withStyles((theme) => ({
  root: {
    opacity: 0.2,
    //textTransform: 'none',
    //color: '#444',
    //fontWeight: theme.typography.fontWeightRegular,
    //fontSize: theme.typography.pxToRem(15),
    //marginRight: theme.spacing(1),
    // '&:focus': {
    //   opacity: 1,
    // },
  },
}))((props) => {
  return (
    <Tab {...props} />
  );
});

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    //width: "100%",
    //backgroundColor: theme.palette.background.paper,
  }
}));

const TabsPanel = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const [tabId, setTabId] = React.useState(0);

  function handleChangeTab(event, id) {
    console.log("handleChangeTab id:", id);
    setTabId(id); // comment to disable the possibility to change tab by clicking on app bar titles
  }
  function goto(where) {
    let id = where;
    if (typeof where === "string") {
      switch (where.toLowerCase()) {
        case "start":
          break;
        case "download":
          break;
        case "fill your data":
          break;
        case "upload":
          break;
        case "check":
          break;
        case "wait for validation":
          break;
        case "finish!":
          break;
        case "next":
          id = tabId + 1; // TODO: handle ring
          break;
        case "prev":
          id = tabId - 1; // TODO: handle ring
          break;
        default:
          console.error(`Unforeseen where specification in goto: ${where}`);
          return;
      }
    }
    setTabId(id);
  }

  return (
    <div className={classes.root}>
      <AppBar position="fixed" elevation={0} style={{/*backgroundColor: "transparent",*/ top: 70}}>
        <Tabs
          value={tabId}
          onChange={handleChangeTab}
          indicatorColor="primary"
          // textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          <StyledTab label={`${t("Start")} 🪄`} {...a11yProps(0)} />
          <StyledTab label={`${t("Download")} ⬇`} {...a11yProps(1)} />
          <StyledTab label={`${t("Fill your data")} 🖋`} {...a11yProps(2)} />
          <StyledTab label={`${t("Upload")} ⬆`} {...a11yProps(3)} />
          <StyledTab label={`${t("Check")} ✔`} {...a11yProps(4)} />
          <StyledTab label={`${t("Wait for validation")} 🎯`} {...a11yProps(5)} />
          <StyledTab label={`${t("Finish!")} 🏁`} {...a11yProps(6)} />
        </Tabs>
      </AppBar>

      <TabPanel value={tabId} index={0}>
        <Tab01Start goto={(where) => goto(where)} />
      </TabPanel>
      <TabPanel value={tabId} index={1}>
        <Tab02Download goto={(where) => goto(where)} />
      </TabPanel>
      <TabPanel value={tabId} index={2}>
        <Tab03FillData goto={(where) => goto(where)} />
      </TabPanel>
      <TabPanel value={tabId} index={3}>
       <Tab04Upload goto={(where) => goto(where)} />
      </TabPanel>
      <TabPanel value={tabId} index={4}>
        controlla che sia tutto corretto...
      </TabPanel>
      <TabPanel value={tabId} index={5}>
        attendi la validazione da parte dell'ANAC...
      </TabPanel>
      <TabPanel value={tabId} index={6}>
        Finito!
      </TabPanel>
    </div>
  );
}

export { TabsPanel };