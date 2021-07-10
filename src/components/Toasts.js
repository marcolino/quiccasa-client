import { useEffect } from "react";
import { ToastContainer as ToastifyContainer, toast } from "react-toastify";
//import "react-toastify/dist/ReactToastify.css";
import { injectStyle } from "react-toastify/dist/inject-style";


export function ToastContainer(props) {
  useEffect(() => {
    injectStyle();
  }, []);

  return (
    <ToastifyContainer
      position="top-right"
      autoClose={3600}
      hideProgressBar={true}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss={false}
      draggable
      pauseOnHover
      className="toastContainer"
      bodyClassName="toastBody"
      {...props}
    />
  );
}

export { toast };
