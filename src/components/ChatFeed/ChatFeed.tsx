import * as React from "react";
import { Header, Feed } from "semantic-ui-react";

import { ChatContainer, ChatFeedText, ChatUserIcon } from "./styles";
import { Message } from "../../types";

interface IProps {
  messages: Message[];
}

const ChatFeed = (props: IProps) => {
  const { messages } = props;
  let feedParent = React.useRef(null);

  const formatDate = (date: number) => new Date(date).toLocaleString();

  React.useEffect(() => {
    const feedEl = feedParent.current.lastChild;
    feedEl.scrollTop = feedEl.scrollHeight;
  }, [messages]);

  return (
    <div ref={feedParent}>
      <Header dividing>CHAT</Header>
      <ChatContainer>
        {messages.map(message => (
          <Feed.Event key={message.id}>
            <Feed.Label>
              <ChatUserIcon name="user circle" size="big" color="blue" />
            </Feed.Label>
            <Feed.Content>
              <Feed.Summary>
                <Feed.User>{message.userName}</Feed.User>
                <Feed.Date>{formatDate(message.date)}</Feed.Date>
              </Feed.Summary>
              <ChatFeedText text>
                <pre>{message.text}</pre>
              </ChatFeedText>
            </Feed.Content>
          </Feed.Event>
        ))}
      </ChatContainer>
    </div>
  );
};

export default ChatFeed;
