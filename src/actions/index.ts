import { Dispatch } from "redux";
import { AxiosResponse } from "axios";

import socketIO from "../api/socketIO";
import api from "../api";
import history from "../history";

import {
  JOIN_ROOM,
  AppActions,
  ADD_NEW_USER_TO_ROOM,
  REMOVE_USER,
  SAVE_USER,
  ADD_NEW_MESSAGE,
  SHOW_ERROR
} from "../types/action-types";
import { Message } from "../types";
import { saveState } from "../localStorage";

const joinRoom = (
  roomId: string,
  userName: string,
  users: string[],
  messages: Message[]
): AppActions => ({
  type: JOIN_ROOM,
  userName,
  roomId,
  users,
  messages
});

export const addNewUserToRoom = (userName: string): AppActions => ({
  type: ADD_NEW_USER_TO_ROOM,
  userName
});

export const removeUser = (userName: string): AppActions => ({
  type: REMOVE_USER,
  userName
});

export const saveUser = (userName: string): AppActions => ({
  type: SAVE_USER,
  userName
});

export const addNewMessage = (message: Message): AppActions => ({
  type: ADD_NEW_MESSAGE,
  message
});

export const showError = (error: string): AppActions => ({
  type: SHOW_ERROR,
  error
});

export const startAddingNewMessage = (message: Message) => {
  return (dispatch: Dispatch<AppActions>) => {
    dispatch(addNewMessage(message));
    socketIO.emit("send-message", message);
  };
};

export const createRoom = (userName: string) => {
  return (dispatch: Dispatch<AppActions>) => {
    api
      .createRoom(userName)
      .then((json: AxiosResponse) => {
        const { roomId } = json.data;
        if (roomId) {
          dispatch(saveUser(userName));
          saveState({ userInfo: { name: userName } });
          history.push(`/room/${roomId}`);
        } else {
          dispatch(showError(json.data.error || "An error occured."));
        }
      })
      .catch(err => {
        dispatch(showError(err));
      });
  };
};

export const startJoiningRoom = (userName: string, roomId: string) => {
  return (dispatch: Dispatch<AppActions>) => {
    api
      .joinRoom(userName, roomId)
      .then((json: AxiosResponse) => {
        if (json.data.roomId) {
          const { users, messages, roomId } = json.data;
          dispatch(joinRoom(roomId, userName, users, messages));
          socketIO.emit("join-room", { roomId, userName });
        } else {
          console.log(json.data);
          dispatch(showError(json.data.error || "An error occured."));
        }
      })
      .catch(err => {
        dispatch(showError(err));
      });
  };
};
