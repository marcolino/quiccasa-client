import React, { useState, createContext } from "react";

const initialState = { /*authorized*/ isAuthenticated: false, user: null };

const AuthContext = createContext(initialState);

const AuthProvider = (props) => {
  const [auth, setAuth] = useState(initialState);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {props.children}
    </AuthContext.Provider>
  )
};

export { AuthProvider, AuthContext };
