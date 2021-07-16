import React, { Suspense, lazy } from 'react';
import { Route, Switch } from 'react-router';
// import Home from "./Home";
// import SignUp from "./Auth/SignUp";
// import SignIn from "./Auth/SignIn";
// import SignOut from "./Auth/SignOut";
// import Profile from "./Auth/Profile";
// import ForgotPassword from "./Auth/ForgotPassword";
// import Searches from "./Searches";
// import Listings from "./Listings";
// import NotFound from "./NotFound";
// import Privacy from "./Privacy";
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
const Privacy = lazy(() => import("./Privacy"));
const TermsOfUse = lazy(() => import("./TermsOfUse"));

export default (
  <Suspense fallback={<span>Loading...</span>}>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/signup" component={SignUp} />
      <Route path="/signin" component={SignIn} />
      <Route path="/profile" component={Profile} />
      <Route path="/signout" component={SignOut} />
      <Route path="/forgot-password" component={ForgotPassword} />
      <Route path="/searches" component={Searches} />
      <Route path="/listings" component={Listings} />
      <Route path="/privacy" component={Privacy} />
      <Route path="/termsofuse" component={TermsOfUse} />
      <Route path="" component={NotFound}/>
    </Switch>
    </Suspense>
);