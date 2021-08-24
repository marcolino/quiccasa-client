import React, { useEffect, Suspense, lazy } from "react";
import { Switch, Route } from "react-router";
import { useLocation } from "react-router";
import queryString from "query-string";
import { useTranslation } from "react-i18next";
import { getCurrentLanguage } from "../libs/I18n";
import { toast } from "./Toasts";
import Spinner from "./Spinner";

const Home = lazy(() => import("./Home"));
const SignUp = lazy(() => import("./auth/SignUp"));
const SignIn = lazy(() => import("./auth/SignIn"));
const SignOut = lazy(() => import("./auth/SignOut"));
const Profile = lazy(() => import("./auth/Profile"));
const ForgotPassword = lazy(() => import("./auth/ForgotPassword"));
const Searches = lazy(() => import("./Searches"));
const Listings = lazy(() => import("./Listings"));
const Unsubscribe = lazy(() => import("./Unsubscribe"));
const NotFound = lazy(() => import("./NotFound"));
const PrivacyPolicy = [];
      PrivacyPolicy["en"] = lazy(() => import("./privacy/en/PrivacyPolicy"));
      PrivacyPolicy["it"] = lazy(() => import("./privacy/it/PrivacyPolicy"));
const TermsOfUse = [];
      TermsOfUse["en"] = lazy(() => import("./privacy/en/TermsOfUse"));
      TermsOfUse["it"] = lazy(() => import("./privacy/it/TermsOfUse"));



export default function Routes () {
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
      <Switch>
        {/**
         * Comments with `sitemapFrequency` and `sitemapPriority` are for sitemap building:
         * if they are present, the route is added to sitemap.xml with those values,
         * when it is automatically built before deploying.
         */}
        <Route path="/" exact component={Home} /> {/* sitemapFrequency={"weekly"} sitemapPriority={0.7} */}
        <Route path="/signup" component={SignUp} /> {/* sitemapFrequency={"monthly"} sitemapPriority={0.3} */}
        <Route path="/signin" component={SignIn} /> {/* sitemapFrequency={"monthly"} sitemapPriority={0.3} */}
        <Route path="/profile" component={Profile} />
        <Route path="/signout" component={SignOut} />
        <Route path="/forgot-password" component={ForgotPassword} />
        <Route path="/searches" component={Searches} /> {/* sitemapFrequency={"daily"} sitemapPriority={1.0} */}
        <Route path="/listings" component={Listings} /> {/* sitemapFrequency={"daily"} sitemapPriority={1.0} */}
        <Route path="/unsubscribe" component={Unsubscribe} /> {/* sitemapFrequency={"monthly"} sitemapPriority={0.2} */}
        <Route path="/privacy-policy" component={PrivacyPolicy[getCurrentLanguage(i18n)]} />
        <Route path="/terms-of-use" component={TermsOfUse[getCurrentLanguage(i18n)]} />
        <Route path="" component={NotFound} />
      </Switch>
    </Suspense>
  );
}
