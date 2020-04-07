import styled from "styled-components";
import { List, ListHeader, Feed, Icon, FeedExtra, Segment } from "semantic-ui-react";


export const ChatTextArea = styled(Segment)`
  position: relative;
  width: 100%;
  height: 15vh;
  padding: 0 !important;
  background-color: #eaeaea !important;

  & button {
    position: absolute;
    bottom: 10px;
    right: 10px;
    text-transform: uppercase !important;
  }

  & form {
    height: 100%;
  }

  & textarea {
    height: 100% !important;
    width: 100% !important;
    resize: none !important;
  }
`;
