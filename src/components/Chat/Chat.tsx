import * as React from "react";
import { Segment, Grid } from "semantic-ui-react";

import ChatUsersList from "../ChatUsersList";
import ChatFeed from "../ChatFeed";
import ChatForm from "../ChatForm";

import { AppActions } from "../../types/action-types";
import { Message } from "../../types";

interface IProps {
  roomId: string;
  userName: string;
  users: string[];
  messages: Message[];
  startAddingNewMessage: (message: Message) => AppActions;
}

const Chat = (props: IProps) => {
  const { users, messages, userName, startAddingNewMessage, roomId } = props;

  return (
    <Segment>
      <Grid container>
        <Grid.Row>
          <Grid.Column>
            <ChatUsersList users={users} />
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column>
            <ChatFeed messages={messages}></ChatFeed>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column>
            <ChatForm
              sendMessage={startAddingNewMessage}
              userName={userName}
              roomId={roomId}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  );
};

export default Chat;
