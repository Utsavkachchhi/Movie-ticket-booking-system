import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

interface DefaultOptions {
  showToast: boolean;
  successToast: string;
  errorToast: string;
}

const defaultOptions: DefaultOptions = {
  showToast: false,
  successToast: "Record has been saved successfully",
  errorToast: "Something Went Wrong",
};

const axiosInstance = axios.create();

const get = (
  url: string,
  axiosOptions: AxiosRequestConfig,
  options: Partial<DefaultOptions> = defaultOptions,
  ...other: any[]
): Promise<AxiosResponse> => {
  options = { ...defaultOptions, ...options };

  return axiosInstance
    .get(url, axiosOptions)
    .then((res: AxiosResponse) => {
      return res;
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};

const post = (
  url: string,
  payload: any,
  options: Partial<DefaultOptions> = defaultOptions
): Promise<AxiosResponse> => {
  options = { ...defaultOptions, ...options };

  return axiosInstance
    .post(url, payload)
    .then((res: AxiosResponse) => {
      return res;
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};

const put = (
  url: string,
  payload: any,
  options: Partial<DefaultOptions> = defaultOptions
): Promise<AxiosResponse> => {
  options = { ...defaultOptions, ...options };

  return axiosInstance
    .put(url, payload)
    .then((res: AxiosResponse) => {
      return res;
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};

const Delete = (
  url: string,
  options: Partial<DefaultOptions> = defaultOptions
): Promise<AxiosResponse> => {
  options = { ...defaultOptions, ...options };

  return axiosInstance
    .delete(url)
    .then((res: AxiosResponse) => {
      return res;
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};

const postWithFormData = (
  url: string,
  payload: any,
  options: Partial<DefaultOptions> = defaultOptions
): Promise<AxiosResponse> => {
  options = { ...defaultOptions, ...options };

  return axiosInstance
    .post(url, payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res: AxiosResponse) => {
      return res;
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};

const putWithFormData = (
  url: string,
  payload: any,
  options: Partial<DefaultOptions> = defaultOptions
): Promise<AxiosResponse> => {
  options = { ...defaultOptions, ...options };

  return axiosInstance
    .put(url, payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res: AxiosResponse) => {
      return res;
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};

const ApiService = {
  get,
  post,
  Delete,
  put,
  postWithFormData,
  putWithFormData,
};

export default ApiService;
