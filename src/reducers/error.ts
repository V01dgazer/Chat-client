import { AppActions, SHOW_ERROR } from "../types/action-types";

export default (state = "", action: AppActions) => {
  switch (action.type) {
    case SHOW_ERROR:
      return action.error;
    default:
      return "";
  }
};
