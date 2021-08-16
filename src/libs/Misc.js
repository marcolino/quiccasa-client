export const capitalize = (string) => {
  return string ? string.charAt(0).toUpperCase() + string.slice(1) : "";
};

export const isEmptyObject = (obj) => {
  return (
    obj ? // null and undefined check
      Object.keys(obj).length === 0 // empty object check
      && obj.constructor === Object // Object.keys(new Date()).length === 0; so we have to check it is not a Date
    :
      true
  );
};

export const isAuthLocation = (location) => {
  return (
    (location.pathname === "/signup") ||
    (location.pathname === "/signin") ||
    (location.pathname === "/profile") ||
    (location.pathname === "/signout") ||
    (location.pathname === "/forgot-password")
  );
}

export const isLocalhost = Boolean(
  window.location.hostname === "localhost" ||
  // [::1] is the IPv6 localhost address.
  window.location.hostname === "[::1]" ||
  // 127.0.0.1/8 is considered localhost for IPv4.
  window.location.hostname.match(
    /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
  )
);
