import React from 'react';
import { Route, Switch } from 'react-router';

import Home from "./Home";
import SignUp from "./Auth/SignUp";
import SignIn from "./Auth/SignIn";
import SignOut from "./Auth/SignOut";
import Profile from "./Auth/Profile";
import ForgotPassword from "./Auth/ForgotPassword";
import Searches from "./Searches";
import Listings from "./Listings";
import NotFound from "./NotFound";
import Privacy from "./Privacy";
import TermsOfUse from "./TermsOfUse";

export default (
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
);