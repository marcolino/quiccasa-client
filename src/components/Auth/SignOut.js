import { useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { signOut } from "../AuthPromise";
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
          setAuth({isAuthenticated: false, user: null})
          history.replace("/");
        },
        error: (err) => {
          console.error("signOut error data:", err);
          toast.error(err.message);
        }
      });
    }
  }, [isOnline, history, setAuth]);

  return null;
};
