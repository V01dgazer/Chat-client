import * as React from "react";
import { connect } from "react-redux";
import { Form, Icon, Button } from "semantic-ui-react";

import validate from "../../validate";

import history from "../../history";
import { saveUser } from "../../actions";
import { AppActions } from "../../types/action-types";

interface IProps {
  userName: string;
  closeModal: () => void;
  saveUser: (userName: string) => AppActions;
}

const JoinRoomComponent = (props: IProps) => {
  const { userName, closeModal, saveUser } = props;
  const [roomId, setRoomId] = React.useState("");
  const [formError, setFormError] = React.useState(false);
  const [roomError, setRoomError] = React.useState(false);

  const onRoomIdChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setRoomId(e.target.value);

  const joinRoom = () => {
    if (validateForm()) {
      saveUser(userName);
      history.push(`/room/${roomId}`);
    }
  };

  const validateForm = () => {
    let error = false;

    const fields = [
      {
        type: "roomId",
        value: roomId,
        callback: setRoomError
      }
    ];

    const fieldsErrors = validate(fields);

    if (!fieldsErrors) {
      fields.forEach(({ callback }) => callback(false));
      error = false;
    } else {
      error = true;
    }

    if (error) {
      setFormError(true);
      return false;
    } else {
      setFormError(false);
      return true;
    }
  };

  return (
    <Form error={formError}>
      <Form.Field>
        <Form.Input
          required={true}
          value={roomId}
          onChange={onRoomIdChange}
          label="Room id"
          placeholder="Enter id"
          error={roomError}
        />
      </Form.Field>
      <Button.Group fluid>
        <Button onClick={joinRoom} color="violet">
          Join
        </Button>
        <Button.Or />
        <Button onClick={closeModal} color="black">
          Back
        </Button>
      </Button.Group>
    </Form>
  );
};

export default connect(
  null,
  { saveUser }
)(JoinRoomComponent);
