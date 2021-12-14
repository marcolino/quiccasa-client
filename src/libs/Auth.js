import config from "../config";

const Auth_ = {
  signIn: (props) => {
    console.log("signIn props:", props);
    const url = "/api/auth/login";
    const verb = "POST";
    return fetcher(url, verb, props);
  },
  signUp: (props) => {
    console.log("signUp props:", props);
    const url = "/api/auth/register";
    const verb = "POST";
    return fetcher(url, verb, props);
  },
  // verify: (props) => {
  //   console.log("verify props:", props);
  //   const url = `/api/auth/verify/${props.token}`;
  //   // TODO: props = props.filter(key => key === "token");
  //   const verb = "POST";
  //   return fetcher(url, verb, props);
  // },
  confirmSignUp: (props) => {
    console.log("confirmSignUp props:", props);
    const url = `/api/auth/verify/${props.code}`; // TODO: choose: verify or confirmSignUp, and code or token (better code) ...
    const verb = "GET";
    return fetcher(url, verb, props);
  },
};

const fetcher = (url, verb, props) => {
  return new Promise((resolve, reject) => {
    if (verb === "GET") { // TODO HEREEEEEEEEEEEEEEE
      var url = new URL('https://sl.se');
      var params = {lat:35.696233, long:139.570431};
      url.search = new URLSearchParams(params).toString();
    } else {
      var headers = {
        method: verb,
        headers: new Headers(config.api.headers),
        body: new URLSearchParams(props),
        redirect: config.api.redirect
      }
    }
    fetch(url, headers)
    .then(res => {
      res.json().then(data => {
        if (!res.ok) reject({status: res.status, statusText: res.statusText, message: data.message})
        resolve(data);
      })
    })
    .catch(err => reject(err));
  });
}

export default Auth_;