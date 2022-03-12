import axios from "axios";

// get token from localStorage
function getLocalToken() {
  console.log("$$$$$$$$$$$$ getLocalToken", window.localStorage.getItem("token"));
  return window.localStorage.getItem("token");
}

function refreshToken() {
console.log("$$$$$$$$$$$$ refreshToken");
  // instance is the axios instance created in current request
  return instance.post("/refreshtoken")
    .then(res => res.data)
    .catch(err => console.error("Error refreshing token:", err)) // TODO...
  ;
}

// create an axios instance
const instance = axios.create({ // TODO: in config...
  baseURL: "/api",
  timeout: 10 * 1000,
  headers: {
    "Content-Type": "application/json",
    "X-Token": getLocalToken() // headers set token
  }
})

// add a setToken method to the instance to dynamically add the latest token to the header after login, and save the token in the localStorage
instance.setToken = (token) => {
console.log("$$$$$$$$$$$$ setToken", token);
  instance.defaults.headers["X-Token"] = token;
  window.localStorage.setItem("token", token);
}

let isRefreshing = false; // is the marker being refreshed?
let requests = []; // retry queue, each item will be a function to be executed

instance.interceptors.request.use(config => {
  const token = window.localStorage.token;
  if (token) {
    console.log("$$$$$$$$$$$$ token IS SET");
    config.headers["X-Token"] = token;
  }
  else console.log("$$$$$$$$$$$$ token IS NOT SET");
  return config;
}, error => {
  console.error("instance.interceptors.request.use error:", error)
  return Promise.reject(error);
});


instance.interceptors.response.use(response => {
  // //document.body.classList.remove("loader"); // hide global loading indicator
  // var elems = document.querySelectorAll(".MuiContainer-root");
  // [].forEach.call(elems, function(el) {
  //     el.classList.remove("loader");
  // });

  const { reason } = response.data;
console.log("$$$$$$ response:", response);
  if (reason === "expired token") {
    const config = response.config;
    if (!isRefreshing) {
      isRefreshing = true;
      return refreshToken().then(res => {
        const { token } = res.data;
console.log("instance.interceptors.response token:", token);
        instance.setToken(token);
console.log("instance.interceptors.response after");
        config.headers["X-Token"] = token;
        config.baseURL = "";
        // token has been refreshed to retry requests from all queues
        requests.forEach(cb => cb(token));
        requests = [];
        return instance(config);
      }).catch(err => {
        console.error("refreshtoken error:", err);
        window.location.href = "/";
      }).finally(() => {
        isRefreshing = false;
      });
    } else { // token is being refreshed and a promise that resolve has not been executed is returned
      return new Promise((resolve) => {
        // put resolve in the queue, save it in a function form, and execute it directly after token refreshes
        requests.push((token) => {
          config.baseURL = "";
          config.headers["X-Token"] = token;
          resolve(instance(config));
        })
      })
    }
  }
console.log("interceptor returning response;", response);
  return response;
}, error => {
  return Promise.reject(error);
});

export default instance;
