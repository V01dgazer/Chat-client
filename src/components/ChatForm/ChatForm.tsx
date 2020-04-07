import * as React from "react";
import { v4 as uuid } from "uuid";
import { Button, Form, TextArea } from "semantic-ui-react";

import { Message } from "../../types";
import { AppActions } from "../../types/action-types";

import { ChatTextArea } from "./styles";

interface IProps {
  userName: string;
  roomId: string;
  sendMessage: (message: Message) => AppActions;
}

const ChatForm = (props: IProps) => {
  const [message, setMessage] = React.useState("");
  const { userName, roomId, sendMessage } = props;

  const onTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.currentTarget.value);
  };

  const onEnter = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.keyCode === 13 && !e.shiftKey) onSubmit();
  };

  const onSubmit = () => {
    if (!message.trim().length) return;

    sendMessage({
      id: uuid(),
      userName,
      roomId,
      date: Date.now(),
      text: message
    });

    setMessage("");
  };

  return (
    <ChatTextArea raised>
      <Form onSubmit={onSubmit} onKeyUp={onEnter}>
        <TextArea onChange={onTextChange} value={message} />
        <Button color="violet">Send</Button>
      </Form>
    </ChatTextArea>
  );
};

export default ChatForm;
