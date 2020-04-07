import styled from 'styled-components';
import { List, ListHeader } from 'semantic-ui-react';

export const InviteHeader = styled.div`
  display: flex;
  align-items: center;

  > button {
    margin-left: auto !important;
  }

  > div {
    margin: 0 !important;
  }
`;

export const UsersList = styled(List)`
  height: 5vh;
  display: flex !important;
  overflow-x: auto;

  @media screen and (max-width: 1400px) {
    height: 6vh;
  }
`;

export const UserListHeader = styled(ListHeader)`
  display: flex !important;
  flex-direction: column;
  align-items: center;

  & > span {
    margin-top: 5px;
  }
`;

export const CopyClipboard = styled.div`
  display: flex;

  & > div {
    flex: 1;
  }
`;