import React, { useEffect } from "react";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export const usePersistedState = (key, defaultValue) => {
  const [state, setState] = React.useState(
    //() => JSON.parse(localStorage.getItem(key)) || defaultValue
    () => {console.log("usePersistedState GET KEY:", key, cookies.get(key) || defaultValue); return cookies.get(key) || defaultValue}
  );
  useEffect(() => {
console.log("usePersistedState SET KEY:", key, "- state:", state, " - JSON.stringify(state):", JSON.stringify(state));
    //localStorage.setItem(key, JSON.stringify(state));
    cookies.set(key, JSON.stringify(state));
  }, [key, state]);
  return [state, setState];
};
