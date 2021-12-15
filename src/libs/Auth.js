import config from "../config";
import { currentFunctionName } from "../libs/Misc";

const Auth_ = {
  signIn: (params) => {
    console.log("sigIn"/*currentFunctionName()*/, params);
    return fetcher("/api/auth/login", "POST", params);
  },
  signUp: (params) => {
    console.log("signUp"/*currentFunctionName()*/, params);
    return fetcher("/api/auth/register", "POST", params);
  },
  confirmSignUp: (params) => {
    console.log("confirmSignUp"/*currentFunctionName()*/, params);
    // TODO: props = props.filter(key => key === "code");
    return fetcher(`/api/auth/verify/${params.code}`, "GET", params); // TODO: choose: verify or confirmSignUp, and code or token (better code) ...
  },
  currentAuthenticatedUser: (params) => {
    console.log(currentFunctionName(), params);
    return new Promise((resolve, reject) => {
      const user = { // TODO: get from local session...
        createdAt: "2021-12-15T16:26:10.447Z",
        email: "marcosolari@gmail.com",
        firstName: "Marco",
        isVerified: true,
        lastName: "Solari",
        password: "$2b$10$ux9zOsagrQ4CGXAjE49Y8.Fxd4XMQVA3FSt3QpIIY/YqW4ZnL1xWG",
        profileImage: "https://i.pinimg.com/564x/15/96/87/159687561cab35ea9646a8f766461226.jpg",
        updatedAt: "2021-12-15T16:26:24.387Z",
        __v: 0,
        _id: "61ba1722cbc8dc74f7348ed0",
      };
      if (user) {
        resolve(user);
      } else {
        reject()
      }
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
        res.json().then(data => {
          if (!res.ok) reject({status: res.status, statusText: res.statusText, message: data.message ? data.message : res.statusText})
          resolve(data);
        })
      })
      .catch(err => reject(err))
    ;
  });
}

export default Auth_;