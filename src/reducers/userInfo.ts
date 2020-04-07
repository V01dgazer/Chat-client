import { AppActions, JOIN_ROOM, SAVE_USER } from "../types/action-types";

interface UserInfo {
  name: string;
}

const initialState: UserInfo = {
  name: "Guest",
};

export default (state = initialState, action: AppActions) => {
  switch (action.type) {
    case SAVE_USER:
    case JOIN_ROOM:
      return { name: action.userName };
    default:
      return state;
  }
};
