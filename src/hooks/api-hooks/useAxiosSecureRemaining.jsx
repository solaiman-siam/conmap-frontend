import axios from "axios";
import { useEffect } from "react";

function useAxiosSecure() {
  const axiosSecure = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
  });

  useEffect(() => {
    const token = localStorage.getItem("token");

    axiosSecure.interceptors.request.use(
      (config) => {
        if (token) {
          config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );
  }, []);

  return axiosSecure;
}

export default useAxiosSecure;
