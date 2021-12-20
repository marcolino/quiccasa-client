import config from "../config";
import { currentFunctionName } from "../libs/Misc";

const Auth_ = {
  signIn: (params) => {
console.log(currentFunctionName(), params);
    return fetcher("/api/auth/login", "POST", params);
  },
  signUp: (params) => {
console.log(currentFunctionName(), params);
    return fetcher("/api/auth/register", "POST", params);
  },
  confirmSignUp: (params) => {
console.log(currentFunctionName(), params);
    // TODO: props = props.filter(key => key === "code");
    return fetcher(`/api/auth/verify/${params.code}`, "GET", params); // TODO: choose: verify or confirmSignUp, and code or token (better code) ...
  },
  currentAuthenticatedUser: (params) => {
console.log(currentFunctionName(), params);
    return new Promise((resolve, reject) => {
      const auth = JSON.parse(localStorage.getItem('auth'));
console.log(currentFunctionName(), "auth:", auth);
      if (auth) {
console.log(currentFunctionName(), "resolving auth.user:", auth.user);
        resolve(auth.user);
      } else {
console.log(currentFunctionName(), "rejecting");
        reject();
      }
    });
  },
  signOut: (params) => {
console.log(currentFunctionName());
    // nothing to do
    return new Promise((resolve, reject) => {
      resolve();
    });
  },
};

const fetcher = (url, method, params) => {
console.log("fetcher:", url, method, params);
  return new Promise((resolve, reject) => {
    if (method === "GET" && params) {
      url += "?" + Object.keys(params).map((key) => {
        return encodeURIComponent(key) + "=" + encodeURIComponent(params[key])
      }).join("&");
    }
console.log("fetcher url 2:", url);
var opt = {
  method,
  headers: new Headers(config.api.headers),
  ...(params && method !== "GET" && { body: JSON.stringify(params) }),
  redirect: config.api.redirect,
}
console.log("fetcher opt:", opt);
    fetch(url, {
      method,
      headers: new Headers(config.api.headers),
      ...(params && method !== "GET" && { body: JSON.stringify(params) }),
      //body: new URLSearchParams(params),
      redirect: config.api.redirect,
    })
      .then(res => {
console.log("fetcher res:", res);
        try {
          res.json().then(data => {
console.log("fetcher data:", data);
            if (!res.ok) reject({status: res.status, statusText: res.statusText, message: data.message ? data.message : res.statusText})
            resolve(data);
          });
        } catch (err) {
          console.error("fetch error:", err); // TODO: !!!
        }

      })
      .catch(err => reject(err))
    ;
  });
}

export default Auth_;