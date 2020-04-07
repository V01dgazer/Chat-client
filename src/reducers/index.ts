import { combineReducers } from "redux";
import userInfo from "./userInfo";
import roomInfo from "./roomInfo";
import error from "./error";

export default combineReducers({
  userInfo,
  roomInfo,
  error
});
