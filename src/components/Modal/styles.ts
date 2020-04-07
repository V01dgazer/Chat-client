import styled from "styled-components";
import { ModalHeader as SemModalHeader } from "semantic-ui-react";

export const ModalHeader = styled(SemModalHeader)`
  &&& {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;
