import axios from "axios";
import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api",
});

const useAxiosSecure = () => {
  const { currentUser } = useAuth();

  useEffect(() => {
    const interceptor = axiosInstance.interceptors.request.use((config) => {
      if (currentUser?.accessToken) {
        config.headers.Authorization = `Bearer ${currentUser.accessToken}`;
      }
      return config;
    });

    return () => {
      axiosInstance.interceptors.request.eject(interceptor);
    };
  }, [currentUser]);

  return axiosInstance;
};

export default useAxiosSecure;
