import { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { signOut } from "../AuthPromise";
import { AuthContext } from "../../providers/AuthProvider";
import { toast } from "../Toasts";



export default function SignOut() {
  const history = useHistory();
  const { setAuth } = useContext(AuthContext);

  useEffect(() => {
    signOut({
      success: () => {
        //toast.success("Signed out"); // too noisy...
        setAuth({isAuthenticated: false, user: null})
        history.replace("/");
      },
      error: (err) => {
        console.error('signOut error data:', err);
        toast.error(err.message);
      }
    });
  }, [history, setAuth]);

  return null;
};
