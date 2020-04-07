import styled from "styled-components";
import { Feed, Icon, FeedExtra } from "semantic-ui-react";

export const ChatContainer = styled(Feed)`
  height: 58vh;
  overflow-y: auto;

  @media screen and (max-width: 1400px) {
    height: 52vh;
  }
`;

export const ChatUserIcon = styled(Icon)`
  font-size: 2.5em !important;
  transform: translate(-5px, -25%);
`;

export const ChatFeedText = styled(FeedExtra)`
  padding-right: 15px !important;
  margin-top: 0 !important;

  & pre {
    margin-top: 0;
    margin-bottom: 0;
    font-family: inherit;
    white-space: pre-wrap;
    word-break: break-all;
  }
`;
