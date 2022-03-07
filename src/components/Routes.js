import React, { useEffect, Suspense, lazy } from "react";
import { Switch, Route } from "react-router-dom"; // TODO: Ok? if so, accorpate with next row
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import { useTranslation } from "react-i18next";
import { getCurrentLanguage } from "../libs/I18n";
import { toast } from "./Toast";
import Spinner from "./Spinner";
//import Profile from "./auth/Profile";

const Home = lazy(() => import("./Home"));
const SignUp = lazy(() => import("./auth/SignUp")); 
const SignIn = lazy(() => import("./auth/SignIn"));
const SignOut = lazy(() => import("./auth/SignOut"));
const Profile = lazy(() => import("./auth/Profile"));
const ForgotPassword = lazy(() => import("./auth/ForgotPassword"));
const Searches = lazy(() => import("./Searches"));
const Listings = lazy(() => import("./Listings"));
//const Unsubscribe = lazy(() => import("./Unsubscribe"));
const Notifications = lazy(() => import("./Notifications"));
const NotFound = lazy(() => import("./NotFound"));
// const PrivacyPolicy = [];
//       PrivacyPolicy["en"] = lazy(() => import("./legal/en/PrivacyPolicy"));
//       PrivacyPolicy["it"] = lazy(() => import("./legal/it/PrivacyPolicy"));
const TermsOfUse = [];
      TermsOfUse["en"] = lazy(() => import("./legal/en/TermsOfUse"));
      TermsOfUse["it"] = lazy(() => import("./legal/it/TermsOfUse"));
const Legal = lazy(() => import("./legal/legal"));
const AdminPanel = lazy(() => import("./AdminPanel"));



function Routes() {
  const location = useLocation();
  const { i18n } = useTranslation();

  // check for error parameters in location url
  useEffect(() => {
    const search = queryString.parse(location.search);
    if (search.error) {
      toast.warning(`Social login did not work, sorry.\n${search.error}: ${search.error_description}`);
    }
  }, [location]);

  return (
    <Suspense fallback={<Spinner />}>
      <div style={styles.content}>
        <Switch location={location}>
        <Route path="/" exact component={Home} /> {/* sitemapFrequency={"weekly"} sitemapPriority={0.7} */}
        <Route path="/signup" component={SignUp} /> {/* sitemapFrequency={"monthly"} sitemapPriority={0.3} */}
        <Route path="/signin" component={SignIn} /> {/* sitemapFrequency={"monthly"} sitemapPriority={0.3} */}
        <Route path="/profile" component={Profile} />
        <Route path="/signout" component={SignOut} />
        <Route path="/forgot-password" component={ForgotPassword} />
        <Route path="/searches" component={Searches} /> {/* sitemapFrequency={"daily"} sitemapPriority={1.0} */}
        <Route path="/listings" component={Listings} /> {/* sitemapFrequency={"daily"} sitemapPriority={1.0} */}
        {/* <Route path="/unsubscribe" component={Unsubscribe} /> sitemapFrequency={"monthly"} sitemapPriority={0.2} */}
        <Route path="/notifications" component={Notifications} /> {/* sitemapFrequency={"monthly"} sitemapPriority={0.2} */}
        {/*
        <Route path="/privacy-policyOLD" component={PrivacyPolicy[getCurrentLanguage(i18n)]} />
        <Route path="/terms-of-useOLD" component={TermsOfUse[getCurrentLanguage(i18n)]} />
        */}
        <Route path="/privacy-policy" render={(props) => <Legal language={getCurrentLanguage(i18n)} doc={"privacyPolicy"} /> } />
        <Route path="/terms-of-use" render={(props) => <Legal language={getCurrentLanguage(i18n)} doc={"termsOfUse"} /> } />
        <Route path="/admin-panel" component={AdminPanel} /> {/* sitemapFrequency={"yearly"} sitemapPriority={0} */}
        <Route path="" component={NotFound} />
      </Switch>
      </div>
    </Suspense>
  );
}

const styles = {};

styles["fade-enter"] = {
  opacity: 0,
  zIndex: 1,
};

styles["fade-enter"] = {
  opacity: 0,
  transition: "opacity 250ms ease-in",
};

styles["fade-enter-active"] = {
  opacity: 1,
  transition: "opacity 250ms ease-in",
};

// styles.fill = {
//   position: "absolute",
//   left: 0,
//   right: 0,
//   top: 100,
//   bottom: 0
// };

// styles.content = {
//   ...styles.fill,
//   top: "140px",
//   textAlign: "center"
// };

export default React.memo(Routes);