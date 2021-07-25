import React, { useState, useEffect, createContext } from "react";

const OnlineStatusContext = createContext(true);

const OnlineStatusProvider = (props) => {
  const [onlineStatus, setOnlineStatus] = useState(true);

  useEffect(() => {
    window.addEventListener("offline", () => setOnlineStatus(false));
    window.addEventListener("online", () => setOnlineStatus(true));
    return () => {
      window.removeEventListener("offline", () => setOnlineStatus(false));
      window.removeEventListener("online", () => setOnlineStatus(true));
    };
  }, []);

  return (
    <OnlineStatusContext.Provider value={onlineStatus}>
      {props.children}
    </OnlineStatusContext.Provider>
  );
};

export { OnlineStatusProvider, OnlineStatusContext };

// export const useOnlineStatus = () => {
//   useContext(OnlineStatusContext);
  
//   //return useContext(OnlineStatusContext);

//   //const store = useContext(OnlineStatusContext);
//   //return store;
// };
