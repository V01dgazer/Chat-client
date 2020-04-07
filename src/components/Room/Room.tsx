import * as React from "react";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";
import { Grid } from "semantic-ui-react";

import Chat from "../Chat";

import socketIO from "../../api/socketIO";
import {
  addNewUserToRoom,
  removeUser,
  startJoiningRoom,
  startAddingNewMessage,
  addNewMessage
} from "../../actions";
import { AppState } from "../../store";
import { AppActions } from "../../types/action-types";
import { Message } from "../../types";
import Modal from "../Modal";
import history from "../../history";

interface IProps {
  userName: string;
  users: string[];
  messages: Message[];
  error: string;
  addNewUserToRoom: (name: string) => AppActions;
  removeUser: (name: string) => AppActions;
  startJoiningRoom: (userName: string, roomId: string) => AppActions;
  startAddingNewMessage: (message: Message) => AppActions;
  addNewMessage: (message: Message) => AppActions;
}

const Room = (props: IProps) => {
  const {
    userName,
    addNewUserToRoom,
    removeUser,
    startJoiningRoom,
    addNewMessage,
    error
  } = props;
  let roomId = useLocation().pathname.replace("/room/", "");

  React.useEffect(() => {
    socketIO.on("user-connected", (name: string) => {
      addNewUserToRoom(name);
    });

    socketIO.on("user-disconnected", (name: string) => {
      removeUser(name);
    });

    socketIO.on("new-message", (message: Message) => {
      addNewMessage(message);
    });

    startJoiningRoom(userName, roomId);

    return () => {
      socketIO.removeAllListeners();
    };
  }, [userName, roomId]);

  const redirectToLogin = () => {
    history.push("/");
  };

  return (
    <Grid padded stretched>
      <Grid.Row>
        <Grid.Column width={4}>
          <Chat {...props} roomId={roomId} />
          <Modal
            open={Boolean(error.length)}
            closeModal={redirectToLogin}
            headerTitle="Something went wrong"
            headerIcon="close"
            onIconClick={redirectToLogin}
          >
            {error}
          </Modal>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

const mapStateToProps = (state: AppState) => {
  return {
    userName: state.userInfo.name,
    users: state.roomInfo.users,
    messages: state.roomInfo.messages,
    error: state.error
  };
};

export default connect(
  mapStateToProps,
  {
    addNewUserToRoom,
    removeUser,
    addNewMessage,
    startJoiningRoom,
    startAddingNewMessage
  }
)(Room);
