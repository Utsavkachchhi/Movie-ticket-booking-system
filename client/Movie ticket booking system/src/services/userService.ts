import ApiService from "./ApiService";
import { API_URL } from "../config/config";

export const loginApi = (data: any) => {
  return ApiService.post(API_URL + `user/login`, data);
};
