//import React from "react";
import { Auth as AWSAuth } from "aws-amplify";
import { trackPromise } from "react-promise-tracker";

// TODO: this does not work! :-(
export async function signIn() { return await trackPromise(AWSAuth.signIn); }