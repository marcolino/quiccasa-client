//import React from "react";
import { Auth } from "aws-amplify";
import { trackPromise } from "react-promise-tracker";

export function signIn(props, {success, error, final}) {
  trackPromise(
    Auth.signIn({...props})
      .then((data) => success(data))
      .catch((data) => error(data))
      .finally((data) => final(data))
  );
}

export function federatedSignIn(props, {success, error, final}) {
  trackPromise(
    Auth.federatedSignIn({...props})
      .then((data) => success(data))
      .catch((data) => error(data))
      .finally((data) => final(data))
  );
}
  
export function signUp(props, {success, error, final}) {
  trackPromise(
    Auth.signUp({...props})
      .then((data) => success(data))
      .catch((data) => error(data))
      .finally((data) => final(data))
  );
};

export function confirmSignUp(username, code, {success, error, final}) {
  trackPromise(
    Auth.confirmSignUp(username, code)
      .then((data) => success(data))
      .catch((data) => error(data))
      .finally((data) => final(data))
  );
};

export function forgotPassword(username, {success, error, final}) {
  trackPromise(
    Auth.forgotPassword(username)
      .then((data) => success(data))
      .catch((data) => error(data))
      .finally((data) => final(data))
  );
};

export function resendSignUp(username, {success, error, final}) {
  trackPromise(
    Auth.resendSignUp(username)
      .then((data) => success(data))
      .catch((data) => error(data))
      .finally((data) => final(data))
  );
};

export function forgotPasswordSubmit(username, code, password, {success, error, final}) {
  trackPromise(
    Auth.forgotPasswordSubmit(username, code, password,)
      .then((data) => success(data))
      .catch((data) => error(data))
      .finally((data) => final(data))
  );
};

export function resendResetPasswordCode(username, {success, error, final}) {
  trackPromise(
    //Auth.resendResetPassword(username)
    Auth.resendSignUp(username)
      .then((data) => success(data))
      .catch((data) => error(data))
      .finally((data) => final(data))
  );
};

export function signOut({success, error, final}) {
  trackPromise(
    Auth.signOut()
      .then((data) => success(data))
      .catch((data) => error(data))
      .finally((data) => final(data))
  );
};
