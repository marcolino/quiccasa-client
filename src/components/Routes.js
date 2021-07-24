import React, { Suspense, lazy } from 'react';
import { Route, Switch } from 'react-router';
import Spinner from "./Spinner";
// import Home from "./Home";
// import SignUp from "./Auth/SignUp";
// import SignIn from "./Auth/SignIn";
// import SignOut from "./Auth/SignOut";
// import Profile from "./Auth/Profile";
// import ForgotPassword from "./Auth/ForgotPassword";
// import Searches from "./Searches";
// import Listings from "./Listings";
// import NotFound from "./NotFound";
// import PrivacyPolicy from "./PrivacyPolicy";
// import TermsOfUse from "./TermsOfUse";

const Home = lazy(() => import("./Home"));
const SignUp = lazy(() => import("./Auth/SignUp"));
const SignIn = lazy(() => import("./Auth/SignIn"));
const SignOut = lazy(() => import("./Auth/SignOut"));
const Profile = lazy(() => import("./Auth/Profile"));
const ForgotPassword = lazy(() => import("./Auth/ForgotPassword"));
const Searches = lazy(() => import("./Searches"));
const Listings = lazy(() => import("./Listings"));
const NotFound = lazy(() => import("./NotFound"));
const PrivacyPolicy = lazy(() => import("./PrivacyPolicy"));
const TermsOfUse = lazy(() => import("./TermsOfUse"));

export default (
  // <Suspense fallback={<span>... TODO ...</span>}> {/* TODO */}
  <Suspense fallback={<Spinner />}>
    <Switch>
      {/* sitemapFrequency and sitemapPriority are for sitemap building */}
      <Route path="/" exact component={Home} /> {/* sitemapFrequency={"weekly"} sitemapPriority={0.7} */}
      <Route path="/signup" component={SignUp} /> {/* sitemapFrequency={"monthly"} sitemapPriority={0.3} */}
      <Route path="/signin" component={SignIn} /> {/* sitemapFrequency={"monthly"} sitemapPriority={0.3} */}
      <Route path="/profile" component={Profile} />
      <Route path="/signout" component={SignOut} />
      <Route path="/forgot-password" component={ForgotPassword} />
      <Route path="/searches" component={Searches} /> {/* sitemapFrequency={"daily"} sitemapPriority={1.0} */}
      <Route path="/listings" component={Listings} /> {/* sitemapFrequency={"daily"} sitemapPriority={1.0} */}
      <Route path="/privacy-policy" component={PrivacyPolicy} />
      <Route path="/terms-of-use" component={TermsOfUse} />
      <Route path="" component={NotFound} />
    </Switch>
  </Suspense>
);
