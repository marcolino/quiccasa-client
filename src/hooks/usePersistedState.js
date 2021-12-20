import React, { useEffect } from "react";

export const usePersistedState = (key, defaultValue) => {
  const [state, setState] = React.useState(
    () => JSON.parse(localStorage.getItem(key)) || defaultValue
  );
  useEffect(() => {
console.log("usePersistedState useEffect - key:", key, "- state:", state, " - JSON.stringify(state):", JSON.stringify(state));
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);
  return [state, setState];
};
