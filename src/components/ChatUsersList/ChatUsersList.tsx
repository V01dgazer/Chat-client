import * as React from "react";
import { useLocation } from "react-router-dom";
import {
  ListItem,
  ListContent,
  ListIcon,
  Button,
  Icon,
  Header,
  Divider,
  Input,
  Popup
} from "semantic-ui-react";

import {
  UsersList,
  UserListHeader,
  InviteHeader,
  CopyClipboard
} from "./styles";
import Modal from "../Modal";

interface IProps {
  users: string[];
}

const ChatUsersList = (props: IProps) => {
  const [modalShown, toggleModal] = React.useState(false);
  const [copySuccess, setCopySuccess] = React.useState(false);
  const { users } = props;

  let inputEl = React.useRef(null);
  let roomId = useLocation().pathname.replace("/room/", "");

  const openModal = () => toggleModal(true);
  const closeModal = () => toggleModal(false);

  const copyToClipboard = () => {
    inputEl.current.select();
    document.execCommand("copy");
    setCopySuccess(true);

    setTimeout(() => {
      setCopySuccess(false);
      window.getSelection().removeAllRanges();
    }, 2000);
  };

  return (
    <>
      <InviteHeader>
        <Header>IN ROOM</Header>
        <Button onClick={openModal} icon labelPosition="right" color="teal">
          INVITE
          <Icon name="plus" />
        </Button>
      </InviteHeader>
      <Divider style={{ marginTop: "5px" }} />
      <UsersList horizontal relaxed size="medium">
        {users.map((user, i) => (
          <ListItem key={user + i}>
            <ListContent>
              <UserListHeader>
                <ListIcon name="user circle" size="large" />
                <span>{user}</span>
              </UserListHeader>
            </ListContent>
          </ListItem>
        ))}
      </UsersList>
      <Modal
        open={modalShown}
        closeModal={closeModal}
        headerTitle="Invite friend"
        headerIcon="user plus"
      >
        <CopyClipboard>
          <Input ref={inputEl} value={roomId} label="Room Id" />
          <Popup
            open={copySuccess}
            content="Copied!"
            position="bottom right"
            trigger={
              <Button onClick={copyToClipboard} icon color="teal">
                Copy
                <Icon name="copy" />
              </Button>
            }
          />
        </CopyClipboard>
      </Modal>
    </>
  );
};

export default ChatUsersList;
