import { useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { signOut } from "../../libs/TrackPromise";
import { AuthContext } from "../../providers/AuthProvider";
import { OnlineStatusContext } from "../../providers/OnlineStatusProvider";
import { toast } from "../Toasts";



export default function SignOut() {
  const history = useHistory();
  const isOnline = useContext(OnlineStatusContext);
  const { setAuth } = useContext(AuthContext);

  useEffect(() => {
    if (!isOnline) { // fake signout while offline...
      // TODO: we should also at least clear localStorage.CognitoIdentityServiceProvider.* keys ...
      //return toast.warning("You are currently offline. Please wait for the network to become available.");
      setAuth({isAuthenticated: false, user: null})
      history.replace("/");
    } else {
      signOut({
        success: () => {
          //toast.success("Signed out"); // too noisy...
          // do signout immediately, after calling signOut, and do not do it here, it's too late for a signout...
          //setAuth({isAuthenticated: false, user: null})
          //history.replace("/");
        },
        error: (err) => {
          console.error("signOut error data:", err);
          toast.error(err.message);
        }
      });

      // do not wait for signOut success, signout user immediately, and hope for the best
      setAuth({isAuthenticated: false, user: null})
      history.replace("/");
    }
  }, [isOnline, history, setAuth]);

  return null;
};
