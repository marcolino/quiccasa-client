import { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Auth } from "aws-amplify";
import { AuthContext } from "../../providers/AuthProvider";
import { toast } from "../Toasts";



export default function SignOut() {
  const history = useHistory();
  const { setAuth } = useContext(AuthContext);

  useEffect(() => {
    Auth.signOut()
      .then(() => {
        toast.success("Signed out");
        setAuth({isAuthenticated: false, user: null})
        history.replace("/");
      })
      .catch((err) => {
        toast.error(err.message);
      })
    ;
  }, [history, setAuth]);

  return null;
};
