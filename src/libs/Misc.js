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
