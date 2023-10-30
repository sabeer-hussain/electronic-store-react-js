import React from "react";
import { useEffect, useState } from "react";
import { privateAxios, publicAxios } from "../services/AxiosService";
import Swal from "sweetalert2";

const useLoader = () => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // request interceptor for public endpoints
    publicAxios.interceptors.request.use(
      (config) => {
        // modification in request
        setLoading(true);
        return config;
      },
      (error) => Promise.reject(error)
    );

    // response interceptor for public endpoints
    publicAxios.interceptors.response.use(
      (config) => {
        // modification in response
        setLoading(false);
        return config;
      },
      (error) => {
        setLoading(false);
        if (error.code === "ERR_NETWORK") {
          // toast.error("Backend Server is down ! Try Again");
          Swal.fire({
            title: "Network Error",
            html: "Backend server is down",
            icon: "info",
          });
        }
        return Promise.reject(error);
      }
    );

    // request interceptor for private endpoints
    privateAxios.interceptors.request.use(
      (config) => {
        // modification in request
        setLoading(true);
        return config;
      },
      (error) => Promise.reject(error)
    );

    // response interceptor for private endpoints
    privateAxios.interceptors.response.use(
      (config) => {
        // modification in response
        setLoading(false);
        return config;
      },
      (error) => {
        setLoading(false);
        if (error.code === "ERR_NETWORK") {
          // toast.error("Backend Server is down ! Try Again");
          Swal.fire({
            title: "Network Error",
            html: "Backend server is down",
            icon: "info",
          });
        }
        return Promise.reject(error);
      }
    );
  }, []);

  return loading;
};

export default useLoader;
