import React, { useEffect } from "react";
import { ToastContainer as ToastifyContainer, toast } from "react-toastify";
import { injectStyle } from "react-toastify/dist/inject-style";



const ToastContainer = React.memo((props) => {
  useEffect(() => {
    injectStyle();
  }, []);

  return (
    <ToastifyContainer
      position="bottom-right"
      //autoClose={5000}
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
});

export { ToastContainer, toast };
