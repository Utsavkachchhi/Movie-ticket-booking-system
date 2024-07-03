import axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { defaultOptions } from "../config/config";

const axiosInstance = axios.create(defaultOptions);

const requestHandler = (
  request: InternalAxiosRequestConfig
): InternalAxiosRequestConfig => {
  const token = localStorage.getItem("token");
  if (token) {
    request.headers["Authorization"] = `Bearer ${token}`;
  }
  return request;
};

const responseHandler = (response: AxiosResponse): any => {
  return response.data;
};

axiosInstance.interceptors.request.use(
  (request: InternalAxiosRequestConfig) => {
    return requestHandler(request);
  }
);

// axiosInstance.interceptors.response.use(
//   (response) => {
//     return responseHandler(response);
//   },
//   function (error) {
//     if (error?.response?.data?.error === "Unauthorized") {
//       store.dispatch(logoutAction());
//     }
//     return Promise.reject(error);
//   }
// );

export { axiosInstance };
