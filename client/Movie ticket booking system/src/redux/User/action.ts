import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { loginApi } from "../../services/userService";
import {
  LoginDetails,
  LoginDetailsFailure,
  LoginDetailsSuccess,
} from "./loginSlice";

export const loginAction = (payload: any) => {
  return function (dispatch: ThunkDispatch<{}, {}, AnyAction>) {
    dispatch(LoginDetails(payload));
    loginApi(payload)
      .then((res) => {
        dispatch(LoginDetailsSuccess(res?.data));
      })
      .catch((error) => {
        console.log("error", error);
        dispatch(LoginDetailsFailure(error?.message));
      });
  };
};
