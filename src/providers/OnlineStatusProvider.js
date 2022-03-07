import React, { useState, useEffect, createContext } from "react";

const OnlineStatusContext = createContext(true);

const OnlineStatusProvider = (props) => {
  const [onlineStatus, setOnlineStatus] = useState(navigator.onLine);

  useEffect(() => {
    window.addEventListener("offline", () => { console.log("GOING OFFLINE"); setOnlineStatus(false)});
    window.addEventListener("online", () => { console.log("GOING ONLINE"); setOnlineStatus(true)});
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
