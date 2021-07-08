import React, { useState, createContext } from "react";

const initialState = { showFooter: true };

const StatusContext = createContext(initialState);

const StatusProvider = (props) => {
  const [status, setStatus] = useState(initialState);

  return (
    <StatusContext.Provider value={{ status, setStatus }}>
      {props.children}
    </StatusContext.Provider>
  )
};

export { StatusProvider, StatusContext };
