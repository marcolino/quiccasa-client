import { useEffect } from "react";
import { ToastContainer as ToastifyContainer, toast as toastNotification } from "react-toastify";
import { injectStyle } from "react-toastify/dist/inject-style";



export function ToastNotificationContainer(props) {
  useEffect(() => {
    injectStyle();
  }, []);

  return (
    <ToastifyContainer
      position="top-left"
      autoClose={false}
      hideProgressBar={true}
      newestOnTop={false}
      //closeOnClick
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

export { toastNotification };
