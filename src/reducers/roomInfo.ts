import {
  AppActions,
  JOIN_ROOM,
  ADD_NEW_USER_TO_ROOM,
  REMOVE_USER,
  ADD_NEW_MESSAGE
} from "../types/action-types";
import { Message } from "../types";

interface RoomInfo {
  users: string[];
  messages: Message[];
}

const initialState: RoomInfo = {
  users: [],
  messages: []
};

export default (state = initialState, action: AppActions) => {
  switch (action.type) {
    case JOIN_ROOM:
      return { ...state, users: action.users, messages: action.messages };
    case ADD_NEW_USER_TO_ROOM:
      return { ...state, users: [...state.users, action.userName] };
    case REMOVE_USER:
      return {
        ...state,
        users: state.users.filter(user => user !== action.userName)
      };
    case ADD_NEW_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, action.message]
      };
    default:
      return state;
  }
};
