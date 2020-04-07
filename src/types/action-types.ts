import { Message } from ".";

export const CREATE_ROOM = "CREATE_ROOM";
export const JOIN_ROOM = "JOIN_ROOM";
export const ADD_NEW_USER_TO_ROOM = "ADD_NEW_USER_TO_ROOM";
export const REMOVE_USER = "REMOVE_USER";
export const SAVE_USER = "SAVE_USER";
export const ADD_NEW_MESSAGE = "ADD_NEW_MESSAGE";
export const SHOW_ERROR = "SHOW_ERROR";

interface JoinRoomAction {
  type: typeof JOIN_ROOM;
  userName: string;
  roomId: string;
  users: string[];
  messages: Message[];
}

interface AddNewUserToRoomAction {
  type: typeof ADD_NEW_USER_TO_ROOM;
  userName: string;
}

interface RemoveUserAction {
  type: typeof REMOVE_USER;
  userName: string;
}

interface SaveUserAction {
  type: typeof SAVE_USER;
  userName: string;
}

interface AddNewMessageAction {
  type: typeof ADD_NEW_MESSAGE;
  message: Message;
}

interface ShowErrorAction {
  type: typeof SHOW_ERROR;
  error: string;
}

export type AppActions =
  | JoinRoomAction
  | AddNewUserToRoomAction
  | RemoveUserAction
  | SaveUserAction
  | AddNewMessageAction
  | ShowErrorAction;
