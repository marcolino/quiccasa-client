import React from "react";
import { useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { signOut } from "../../libs/TrackPromise";
import { AuthContext } from "../../providers/AuthProvider";
import { OnlineStatusContext } from "../../providers/OnlineStatusProvider";
import { toast } from "../Toast";



function SignOut() {
  const history = useHistory();
  const isOnline = useContext(OnlineStatusContext);
  const { auth, setAuth } = useContext(AuthContext);
  const { t } = useTranslation();

  // use `useEffect` to avoid  "cannot update a component while rendering a different component" error
  useEffect(() => {
    if (!isOnline) { // fake signout while offline...
      // TODO: we should also at least clear localStorage.CognitoIdentityServiceProvider.* keys ...
      //return toast.warning("You are currently offline. Please wait for the network to become available.");
console.log("signOut calling setAuth");
      setAuth({ user: false })
      history.replace("/");
    } else {
      signOut({
        success: () => {
          //toast.success(t("Signed out")); // too noisy...
console.log("signOut calling setAuth");
          setAuth({ user: false })
          history.replace("/");
        },
        error: (err) => {
console.error("signOut error:", err);
          toast.error(t(err.message));
        }
      });
    }
  }, [isOnline, history, auth, setAuth, t]);

  return null;
};

export default React.memo(SignOut);
