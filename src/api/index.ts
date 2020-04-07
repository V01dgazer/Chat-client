import axios from "axios";

const createRoom = (userName: string) => {
  return axios.post("https://selvchat.herokuapp.com/api/room/create", {
    userName
  });
};

const joinRoom = (userName: string, room: string) => {
  return axios.post("https://selvchat.herokuapp.com/api/room/join", {
    userName,
    room
  });
};

export default {
  createRoom,
  joinRoom
};
