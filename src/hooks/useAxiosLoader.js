import { useState, useCallback, useMemo, useEffect } from "react";
//import axios from "axios";
import instance from "../middlewares/Interceptors";

//const instance = axios.create(); // export this and use it in all your components

export const useAxiosLoader = () => {
//console.log("*** useAxiosLoader");
  const [counter, setCounter] = useState(0);
  const inc = useCallback(() => {console.log("LOADING INC"); setCounter(counter => counter + 1)}, [setCounter]); // add to counter
  const dec = useCallback(() => setCounter(counter => counter - 1), [setCounter]); // remove from counter
  
  const interceptors = useMemo(() => ({
    /* eslint-disable no-sequences */
    request: config => (inc(), config),
    response: response => (dec(), response),
    error: error => (dec(), Promise.reject(error)),
  }), [inc, dec]); // create the interceptors
  
  useEffect(() => {
    // add request interceptors
    const reqInterceptor = instance.interceptors.request.use(interceptors.request, interceptors.error);
    // add response interceptors
    const resInterceptor = instance.interceptors.response.use(interceptors.response, interceptors.error);
    return () => {
      // remove all intercepts when done
      instance.interceptors.request.eject(reqInterceptor);
      instance.interceptors.response.eject(resInterceptor);
    };
  }, [interceptors]);
  
  return [counter > 0];
};