import { combineReducers } from "redux";
import loginSlice from "./User/loginSlice";

const rootReducer = combineReducers({
  Auth: loginSlice,
});

export default rootReducer;
