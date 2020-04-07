import * as React from "react";
import { connect } from "react-redux";
import { Form, Segment, Button, Icon } from "semantic-ui-react";

import Modal from "../Modal";
import JoinRoom from "../JoinRoom";

import validate from "../../validate";
import { createRoom } from "../../actions";
import { AppActions } from "../../types/action-types";

interface IProps {
  createRoom: (userName: string) => AppActions;
}

const LoginForm = (props: IProps) => {
  const { createRoom } = props;
  const [modalShown, toggleModal] = React.useState(false);

  const [userName, setUserName] = React.useState("");
  const [formError, setFormError] = React.useState(false);
  const [userNameError, setUserNameError] = React.useState(null);

  const openModal = () => validateForm() && toggleModal(true);
  const closeModal = () => toggleModal(false);

  const onUserNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
    setUserNameError(null);
  };

  const startCreatingRoom = () => {
    if (validateForm()) createRoom(userName);
  };

  const validateForm = () => {
    let error = false;

    const fields = [
      {
        type: "userName",
        value: userName,
        callback: setUserNameError
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
    <>
      <Segment raised>
        <Form error={formError} size="big" unstackable>
          <Form.Field width="16">
            <Form.Input
              value={userName}
              onChange={onUserNameChange}
              label="Name"
              placeholder="Enter you name"
              error={userNameError}
            />
          </Form.Field>
          <Button.Group fluid>
            <Button onClick={startCreatingRoom} color="teal">
              Create new room
            </Button>
            <Button.Or />
            <Button color="violet" onClick={openModal}>
              Join existing room
            </Button>
          </Button.Group>
        </Form>
      </Segment>
      <Modal
        headerTitle="Join existing room"
        headerIcon="user plus"
        size="mini"
        open={modalShown}
        closeModal={closeModal}
      >
        <JoinRoom userName={userName} closeModal={closeModal} />
      </Modal>
    </>
  );
};

export default connect(
  null,
  { createRoom }
)(LoginForm);
